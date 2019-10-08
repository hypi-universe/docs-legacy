---
ID: 1323
post_title: 'Evaluating a Car&#8217;s Condition with Machine Learning'
author: Usman Malik
post_excerpt: ""
layout: post
permalink: >
  https://hypi.io/blog/2019/10/08/evaluating-a-cars-condition-with-machine-learning/
published: true
post_date: 2019-10-08 12:17:17
---
<!-- wp:heading {"level":3} -->
<h3>Introduction </h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Machine learning techniques, owing to their accuracy and precision, are being increasingly employed for decision making in a variety of scenarios. From stock purchases to marketing campaigns, organizations base their decisions on the insights obtained from data via machine learning techniques. This article demonstrates how machine learning automates the decision-making process of evaluating a car's condition.  You will see how to develop a machine learning model which predicts if a car is in an unacceptable, acceptable, good or very good condition, based on different characteristics of the car.  </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Prerequisites</h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol><li>It is assumed that the readers have intermediate knowledge of the Python programming language since the code samples are in Python.</li><li>The code has been tested with <a href="https://colab.research.google.com">Google Colaboratory</a>.  However, you can run it on your local machines as well, provided you have installed Python 3.6.</li></ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Step 1: Problem Statement &amp; Dataset</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The task is to predict whether a car is in an unacceptable, acceptable, good or very good condition based on car characteristics such as the price of the car, maintenance cost, safety features, luggage space, seating capacity,  and the number of doors. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The dataset we will be using to build our model can be freely downloaded from <a href="https://www.kaggle.com/elikplim/car-evaluation-data-set">this kaggle link.</a>  The dataset is in CSV format. In case you are using a cloud platform to develop the model, you will need to upload the CSV file to the corresponding cloud platform. </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 2: Importing Libraries and Loading the Dataset</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The following script imports the libraries required to execute the scripts in this article:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">import pandas as pd
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

import matplotlib.pyplot as plt 
%matplotlib inline

import seaborn as sns
sns.set(style="darkgrid")</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>If you open the CSV file for the dataset, you will see that it doesn't contain headers for data columns. The details of the headers for the dataset is available at <a href="https://archive.ics.uci.edu/ml/datasets/Car+Evaluation">this link</a>.  If you look at the "Attribute Information"  heading at the link, you can see the details of the headers that correspond to different attributes of the cars.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are 6 attributes in total: </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li><code>buying:</code>  which corresponds to the price of the car. There are four possible values for this attribute:  <code>vhigh</code>, <code>high</code>, <code>med</code> and <code>low</code>.</li><li><code>maint</code>: which stands for the maintenance cost. It can also have the same four possible values as for the <code>buying</code> attribute.</li><li><code>doors</code>: corresponds to the number of doors of a car. The possible values are <code>2</code>, <code>3</code>, <code>4</code>, <code>5more</code>.</li><li><code>persons</code>: refers to the seating capacity of a car. The possible values are <code>2</code>, <code>4</code> or <code>more</code>.</li><li><code>lug_boot</code>: contains information about the luggage compartment, and can have <code>small</code>, <code>med</code>, and <code>big</code> as the possible values. </li><li><code>safety</code>: corresponds to the safety rating of the car. The possible values are <code>low</code>, <code>med</code>, and <code>high</code>.</li><li><code>class</code>: refers to the manual evaluation of the car's condition. A car can be in an unacceptable condition, acceptable condition, good condition, and very good condition. The shorthand notations for the values are <code>unacc</code>, <code>acc</code>, <code>good</code>, and <code>vgood</code>. The <code>class</code> attribute is renamed as <code>condition</code> for the sake of readability. </li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>The task is to predict the value for the seventh attributes, given the values for the first six attributes. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The following script loads the dataset:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">colnames=['buying', 'maint', 'doors', 'persons', 'lug_boot', 'safety','condition'] 
car_data = pd.read_csv(r'E:\Datasets\car_prediction.csv', names=colnames, header=None)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Let's first see how our dataset looks like. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">car_data.head()</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output: </strong></p>
<!-- /wp:paragraph -->

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://hypi.io/wp-content/uploads/2019/10/image.png" alt="This image has an empty alt attribute; its file name is image.png"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>You can see the seven attributes in the dataset.  Let's now print the unique values for all the columns in our dataset.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">for col in car_data:
    print("--")
    print(col)
    print (car_data[col].unique())</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">--
buying
['vhigh' 'high' 'med' 'low']
--
maint
['vhigh' 'high' 'med' 'low']
--
doors
['2' '3' '4' '5more']
--
persons
['2' '4' 'more']
--
lug_boot
['small' 'med' 'big']
--
safety
['low' 'med' 'high']
--
condition
['unacc' 'acc' 'vgood' 'good']</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>Step 3: Exploratory Data Analysis</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Before training the model, it is always a good idea to perform some exploratory data analysis on the data. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's visualize the relationship between the output class i.e. <code>condition</code> and some of the other attributes in the dataset. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Firstly, we increase the default plot size with the following script:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">plot_size = plt.rcParams["figure.figsize"]
plot_size [0] = 8
plot_size [1] = 6
plt.rcParams["figure.figsize"] = plot_size </code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p> The following script generates a pie plot that shows the class distribution for the <code>condition</code> column.  </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">car_data.condition.value_counts().plot(kind='pie', autopct='%1.0f%%', colors = ['skyblue', 'orange', 'pink', 'lightgreen'], explode = (0.05, 0.05, 0.05,0.05))</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1327,"sizeSlug":"large"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/image-1.png" alt="" class="wp-image-1327"/></figure></div>
<!-- /wp:image -->

<p>You can see that 70% of the cars have unacceptable conditions while 22% of the cars are in acceptable conditions. The ratio of cars with good and very good conditions is very low.&nbsp;</p>

<!-- wp:paragraph -->
<p>Let's now see the relationship between the <code>condition</code> and <code>buying</code> attributes:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">(car_data
 .groupby(['condition', 'buying'])
 .size()
 .unstack()
 .plot.bar()
)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1328,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/image-2.png" alt="" class="wp-image-1328"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The output shows that cars with acceptable and unacceptable conditions belong to all price ranges. However, cars with good and very good conditions are either medium or low price cars. The possible reason for this distribution is that expensive cars might have better conditions than less expensive cars, however, the conditions of the expensive cars may not justify their price tags. Hence, with respect to their price, the condition has been rated as either acceptable or not acceptable, and not good or very good. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Next, let's plot the relationship between the <code>conditions</code> and <code>doors</code> attributes. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">(car_data
 .groupby(['condition', 'doors'])
 .size()
 .unstack()
 .plot.bar()
)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1329,"sizeSlug":"large"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/image-3.png" alt="" class="wp-image-1329"/></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>You can see that the distribution of cars with respect to the number of doors across various car condition types is approximately the same. Therefore, <code>doors</code> is not a very good attribute for decision making regarding a car's condition.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Finally, we will plot the relationship between <code>condition</code> and <code>safety</code> attributes. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">(car_data
 .groupby(['condition', 'safety'])
 .size()
 .unstack()
 .plot.bar()
)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1330,"sizeSlug":"large"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/image-4.png" alt="" class="wp-image-1330"/></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The output shows that none of the cars with low safety have been rated as being in acceptable, good or very good condition. All the cars with low safety features have been rated as having unacceptable conditions. Therefore, it can be assumed that safety is a very good feature for decision making regarding a car's condition.  In the same way, we can study the relationships between the remaining attributes in the dataset. </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 4: Data Preprocessing</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p> The basic purpose of exploratory data analysis is to see which are the most important features for decision making since a large number of features can really slow down the model training and can also negatively affect the performance of the algorithms. Exploratory data analysis and feature selection is a mandatory step in case you have large datasets.  However, since we have only 6 features to base our decision on, we will retain all of the features in the dataset and will apply pre-processing to all of them.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>All the features in our dataset are categorical, i.e. they contain categorical values. Features that contain both numerical and categorical values, for instance,   <code>doors</code> and <code>person</code> are also treated as categorical features. However, machine learning algorithms work only with numbers. Therefore, we need to convert the categorical features in our dataset to their numerical counterparts. To do so, <a href="https://machinelearningmastery.com/why-one-hot-encode-data-in-machine-learning/">one-hot encoding</a> can be used. In one hot encoding, for each value in a categorical column, a new column is created. The integer 1 is added to one of the newly generated columns that correspond to the actual value. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's first remove all the features or attributes from the <code>car_data</code> dataset, except `condition` since the condition is what we have to predict.  </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">temp_data =  car_data.drop(['buying', 'maint', 'doors', 'persons', 'lug_boot', 'safety'] , axis=1)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Next, we need to create one-hot encoded columns for the attributes that we dropped. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">buying = pd.get_dummies(car_data.buying, prefix = 'buying')
maint = pd.get_dummies(car_data.maint, prefix = 'maint')

doors = pd.get_dummies(car_data.doors, prefix = 'doors')
persons = pd.get_dummies(car_data.persons, prefix = 'persons')

lug_boot = pd.get_dummies(car_data.lug_boot, prefix = 'lug_boot')
safety = pd.get_dummies(car_data.safety, prefix = 'safety')</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now, if you print the `buying` dataframe, you should see the following output:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">buying.head()</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1331,"sizeSlug":"large"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/image-5.png" alt="" class="wp-image-1331"/></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>You can see that for each value in the original `buying` column, a new column has been generated. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Next, we need to concatenate the one-hot encoded columns for all the attributes to create the final dataset.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">car_data = pd.concat([buying, maint, doors, persons, lug_boot, safety, temp_data] , axis=1)</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2> Step 5: Training the Model</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In this step, we will train our machine learning model on the data.  We will use the <a href="https://towardsdatascience.com/understanding-random-forest-58381e0602d2">Random Forest algorithm</a> to train our model. However, before that, we need to divide the dataset into training and test set. The model is trained on the training data and model performance is evaluated on the test data. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The following script divides the data into training and test sets:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">X = car_data.loc[:, car_data.columns != 'condition'].values
y = car_data[['condition']]

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Finally, the following script trains the model on the test set:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">from sklearn.ensemble import RandomForestClassifier

model= RandomForestClassifier(n_estimators=20, random_state=0)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>Step 6: Evaluating Model Performance</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><a href="https://en.wikipedia.org/wiki/Confusion_matrix">Confusion matrix</a>, <a href="https://towardsdatascience.com/accuracy-precision-recall-or-f1-331fb37c5cb9">accuracy, precision, and recall</a> are the performance metrics used to evaluate the performance of a classification model such as the one we developed in this article. Look at the following script:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="python" class="language-python">
print(classification_report(y_test,y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test,y_pred))

print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>Output:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code class="">   precision    recall  f1-score   support

         acc       0.95      0.88      0.91        83
        good       0.62      0.73      0.67        11
       unacc       0.98      1.00      0.99       235
       vgood       0.88      0.82      0.85        17

   micro avg       0.95      0.95      0.95       346
   macro avg       0.85      0.86      0.85       346
weighted avg       0.96      0.95      0.95       346


Confusion Matrix:
[[ 73   5   5   0]
 [  1   8   0   2]
 [  0   0 235   0]
 [  3   0   0  14]]

Accuracy:
0.953757225433526</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Our model achieves an accuracy of 95.37% which is pretty impressive.  </p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Conclusion</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Car condition evaluation is one of the many decision-making problems that can be solved via machine learning techniques. This article explains how to automate the process of predicting the condition of any car based on several attributes such as price, safety, maintenance cost, etc. The article also explains how to perform exploratory data analysis for studying feature importance. </p>
<!-- /wp:paragraph -->