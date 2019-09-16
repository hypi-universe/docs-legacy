---
ID: 1192
post_title: 'GraphQL &#8211; Everything You Need to Know'
author: joniqureshi
post_excerpt: ""
layout: post
permalink: >
  https://hypi.io/blog/2019/09/15/graphql-everything-you-need-to-know/
published: true
post_date: 2019-09-15 13:33:44
---
<!-- wp:heading {"level":1} -->
<h1>GraphQL - Everything You Need to Know</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>GraphQL is an open-source server-side library created by Facebook to enhance RESTful API calls. The purpose of GraphQL was to decrease the load on server. Before GraphQL, users had to call all the data just to get certain information from the database. With GraphQL, getting server information has become much easier and a lot faster.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>You can implement GraphQL API using the Apollo server, it is completely free to use.</li><li>GraphQL works with multiple languages but for this particular post, we will be using NodeJS and NPM</li><li>If you are not familiar with ReactJS, don’t worry, the tutorial is not any more overwhelming than what you already know.</li></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Using GraphQL - Why is it Necessary?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>RESTful APIs serve only one purpose - to fetch data from an API successfully. But, what if it is not possible to request the data through a single request? This puts excessive load on the server and increases the response time. This is where GraphQL comes in. GraphQL offers a structured approach to get data requests through its simple yet powerful query syntax. GraphQL can successfully traverses, retrieve, and modify data.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Get What You Want</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The best part about GraphQL is that you get exactly what you want. GraphQL queries can be used on all opensource data in a fast and predictable way. <br>
Let’s take an example of how you can use the GraphQL API to get data from an API.<br>
There is an object Movie with attributes Name, Genre, Year.  Suppose you want to fetch only the Name and Year for the movie. With a REST API /api/v1/movies, you will end up fetching all the data in the Movie object. GraphQL solves this problem by fetching only what matters.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Fields</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A GraphQL query for the above data would be like </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
   Movie {
      name
      year
   }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Returns</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
   "data": {
      "movie": [
         {
            "name": "avengers",
            "year": "2019"
         },
         {
            "name": "justice league",
            "year": "2017"
         }
      ]
   }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>In the above code, each parameter is known as ‘Field’ in GraphQL.<br>
Now, what if you would want to get more details about the movie object? GraphQL also lets you do that.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
   movies{
      name
      year
      genre
      studio{
         name
         location
      }
   }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This is a simple query that you will use to get data from the API. The result of this query will be like:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
   "data": {
      "movies": [
         {
            "name": "avengers",
            "year": "2019",
            "genre": "action",
            "studio": {
               "name": "Marvel",
               "location": "USA"
            }
         },
     ]
   }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>The use of sub-data is called as ‘Sub-selection’ in GraphQL. In our example, we have the sub-selection of ‘Name’ and ‘Location’.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Types</h2>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>type Query {
   movies:[Movie]
}</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>type Student {
   name:String
   year:int
   studio:studio
    budget: Float


}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>By describing type systems, you reduce errors in fetching unnecessary or wrong information from the API call.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Arguments</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>GraphQL is a highly useful language when you know what type of data you want from each request. Let’s say if you know the ID of a person but want to know their Name and DOB, you can pass the ID as an argument.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  Person(id: "1") {
    name
    dob
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>The result will show the Name and the DOB of the person whose ID you have passed in as the argument.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "data": {
    "person": {
      "name": "Marco Polo",
      "dob": 1/11/19
    }
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Arguments can be of many different types. In our example, we have passed-in a finite argument but GraphQL allows you to create custom types of arguments for more specific data sets. Learn more about it here.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Aliases</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>GraphQL also allows you to get data from different datasets through a single query. In the example below, we have used Movie for both datasets, but as you can see the results are different.<br>
We will call this ‘Aliases’ technique. </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
 avengers: movie(episode: Avengers) {
    name
  }
  endgame: hero(episode: Avengers Endgame) {
    name
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>The result fetches different data for both.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  "data": {
    "avengers": {
      "name": "Iron Man"
    },
    "endgame": {
      "name": "Thor"
    }
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>Fragments</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Fragments let you run two entirely different requests together. Let’s say you would want to compare two objects and their parameters together. This will get complex when you try it out, however, with fragments this is possible.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>{
  leftComparison: movie(episode: AVENGERS) {
    ...comparisonFields
  }
  rightComparison: movie(episode: ENDGAME) {
    ...comparisonFields
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>fragment comparisonFields on Character {
  name
  budget
  studio {
    name
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>With the <strong>comparisonFields</strong> data you can easily compare complex queries by breaking them into small chunks. This is especially useful when you have to display multiple objects in a single UI.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Operation name</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>For the explanation purpose, we haven’t used the operational keywords. But when you run the GraphQL queries in a production environment you will have to use the proper structure. This includes query keyword, query name, and less ambiguous code.<br>
An example of how to use keyword query as operation type is given below:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>query MovieNameAndCast{
  movie {
    name
    cast {
      name
    }
  }
}</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>Variables</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>It is not feasible to pass dynamic arguments directly in the query because then the client-side will have to dynamically manipulate the query string at runtime. With GraphQL you can pass these dynamic values out of the query, as a separate dictionary. These values are called variables.<br>
Instead, we will add the variable name $variablename to replace the static value. Then, we will pass the static value separately through the JSON library.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>query MoviesOf2019($movie: Movie) {
  hero(movie: $movie) {
    name
    friends {
      name
    }
  }
}
Variable
{
 “movie": "AVENGERS"
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>In the above example, we have added the variable separately in the client code. This way, we won’t have to construct a separate query for other similar data.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Directives</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Directives work just like the variables you pass within the query. But the purpose of a directive is to hire or show certain parts of the information.<br>
For example, you can add or remove certain information in the content by introducing a Boolean operator. The Boolean operator can be changed later without changing the whole query.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>query MovieName($movie: Movie, $withGenre: Boolean!) {
  MovieName(movie: $movie) {
    name
    genre @include(if: $withGenre) {
      name
    }
  }
}
Input Directives
{
  "movie": "AVENGERS",
  "withGenre": true
} </code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Here ‘true’ shows the genre of the movie. However, you can hide it with the directive ‘false’.</p>
<!-- /wp:paragraph -->