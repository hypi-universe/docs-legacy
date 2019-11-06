---
ID: 731
post_title: Introduction to Clojure
author: pj
post_excerpt: ""
layout: post
permalink: >
  https://hypi.io/blog/solutions/introduction-to-clojure/
published: true
post_date: 2018-12-05 20:21:18
---
<!-- wp:paragraph -->

[Clojure][1] is a modern dialect of Lisp designed to run on the Java Virtual Machine and the Common Language Runtime.  Descending from Lisp, Clojure has a strong emphasis on [functional programming][2] and a philosophy of treating [code as data][3].  Learning Lisp will challenge you to think about programs and programming in a new way from procedure oriented languages.  Clojure is a very accessible dialect of Lisp that runs on most computers.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

This gentle introduction assumes that you are coming from a procedural language language like C or Java with little or no exposure to Lisp.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**The REPL**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

If you’re approaching Clojure from a compiled language like C or Java, the [Clojure REPL][4] might be an unfamiliar way of working with a language.  REPL stands for **R**ead **E**valuate **P**rint **L**oop is an interactive programming environment which allows you to develop Clojure code one expression at a time.  We’ll start demonstrating Clojure through the Clojure REPL tool clj. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

To run our sample code, you will need to install Clojure locally or you can run it from a online interpreter.  Instructions for installing Clojure locally can be found on the [Getting Started page at Clojure.org][5].  If you would prefer to start with an online interpreter, you can try [repl.it][6] or any of the  other sites that come up following a search.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Assuming that you are running your code locally, launch clj from the command line.  You should see a prompt similar to:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"Clojure 1.9.0\nuser=\u003e","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eClojure\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1.9\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e.\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e0\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

The prompt tells us we are running version 1.9.0 of Clojure and that you can now start typing expressions for the interpreter to evaluate.  (You can press Control + D at any time to quit.) We’ll start by typing in some basic mathematical expressions in Clojure.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Clojure Expressions**

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (+ 1 3 5)\n9\nuser=\u003e (* 2 4)\n8\nuser=\u003e (/ 4 2 2)\n1","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e9\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e*\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e8\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Our basic math expressions consist of a prefix operator and a dynamic number of argument.  At first glance, this might look like some simple syntactic difference between Clojure and C-like languages, but the differences run a bit deeper.  In C-like languages, programs consist of statements and expressions. Statements have side-effects but don’t have a value, only expressions have a value.  Clojure programs are built entirely out of expressions. Clojure expressions consist of a list (marked by parenthesis) consisting of a function and a series of 0 or more arguments.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

More complex expressions can be built up by combining expressions into larger expressions:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (+ (/ 4 2) (* 3 2) (+ 1 3 7))\n19","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e)\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e*\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e)\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e7\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e19\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

In Clojure, the primary data structure used in the language is lists.  We’ve already seen the use of lists to construct expressions, we can also store data in lists and manipulate our data using functions:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (first '(1 2 3 4 5))\n1\nuser=\u003e (rest '(1 2 3 4 5))\n(2 3 4 5)","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003efirst\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;(\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003erest\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;(\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e(\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e)\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

In the two expression above, we treat our list as a data object by using `quote (')`.   Quote is a function that returns the unevaluated form of the list - the interpreter doesn’t try to evaluate 1 as a function.  Here we use the function `first` to get the first element of the list and `rest` to get the remainder (as a list).

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

**Function Definition and Special Forms**  
Clojure allows you to create a function using the `defn` special form.  You’ve already seen one example of a special form `(quote), defn` is another.  A [special form][7] is an expression that has its own evaluation rule.  For now, you can think of special forms as the built-in syntax of the language that you can use for developing programs.  Following ancient programmer tradition, let’s create a hello world function in Clojure:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (defn hello-world [] (print \u0022Hello World!\\n\u0022))\n#'user/hello-world","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003edefn\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ehello\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eworld\u003c/span\u003e\u0026nbsp;[]\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003eprint\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string\u0022\u003e\u0026#x22;Hello World!\\n\u0026#x22;\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e#\u003c/span\u003e\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;u\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eser\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ehello\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eworld\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Our function definition is event an expression that evaluates to a value.  It starts with the name (hello-world) followed by a list of arguments (in this case none) and an expression to perform our computation.  In this case, which is slightly unusual, our expression has a side effect which is to print the message “Hello World!”.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Now, let’s create a function add-one that increments a value:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (defn add-one [x] (+ 1 x))\n#'user/add-one","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003edefn\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e]\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e#\u003c/span\u003e\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;u\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eser\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Our expression consists of a name (`add-one`) , a single parameter (`x`) and an expression representing our computation. Notice that even `defn` evaluates to a value, namely the symbol for the function.  We can call our function once it’s defined in another expression:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (add-one 1)\n2\nuser=\u003e (add-one (add-one (add-one 1)))\n4","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e)))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Now let’s go back and try running our `hello-world` function:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (hello-world)\nHello World!\nnil","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003ehello\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eworld\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eHello\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eWorld\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003enil\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Notice we get a slightly different result, `nil`.  In Clojure, every expression evaluates to a value, so if a function returns no value that is represented by nil.  Nil is the absence of value 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Clojure has additional special forms that allow you to build up more complex expressions.  

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The if form allows us to build expressions that return different values based on a test condition.   Clojure has a built-in function `zero?` that tests if a value is zero.  We can write our own version of that function:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (defn my-zero? [x] (if (= x 0) true false))\n#'user/is-zero?\nuser=\u003e (zero? 2)\nfalse\nuser=\u003e (is-zero? 0)\ntrue","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003edefn\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003emy\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ezero\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e?\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e]\u0026nbsp;(\u003cspan class=\u0022kbco-keyword\u0022\u003eif\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e0\u003c/span\u003e)\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003etrue\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003efalse\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e#\u003c/span\u003e\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;u\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eser\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eis\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ezero\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e?\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003ezero\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e?\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003efalse\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eis\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ezero\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e?\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e0\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003etrue\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

It is very important to remember that if evaluates to the first expression if the test is true and the second expression if the test is false.  Those expressions could be far more complex than just `true` or `false`.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The let special form allows us to create a local binding (similar to a local variable) of the result of an expression to a symbol:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (let [x 1 \n             y 2]\n        (+ x y))\n3","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-keyword\u0022\u003elet\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e             \u003cspan class=\u0022kbco-variable\u0022\u003ey\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e        (\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ey\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

With let, we define a sequence of bindings between symbols and the result of an expression.  Notice here we use `let` in the context of a simple expression, you don’t necessarily have to use it within a function.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Finally, recursive expressions are one of the basic building blocks in Clojure for building repeated computations.  We can build a simple recursive factorial function:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"(defn factorial [x] (if (\u003c= x 1) 1 (* x (factorial (- x 1)))))\n#'user/factorial\nuser=\u003e (factorial 3)\n6","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e(\u003cspan class=\u0022kbco-variable\u0022\u003edefn\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003efactorial\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e]\u0026nbsp;(\u003cspan class=\u0022kbco-keyword\u0022\u003eif\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e\u0026#x3C;=\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e)\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e*\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003efactorial\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003ex\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e)))))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e#\u003c/span\u003e\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;u\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eser\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e/\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003efactorial\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003efactorial\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e6\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

**Higher Order Functions**

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Functions in Clojure can be passed as parameters to other functions and used to build complex expressions as well.  The built-in functions `map`, `reduce`, `apply` are the main functions used with functional arguments.  Each of these higher order functions operates differently:  
The map function applies it’s first argument (the function) to each element of the second argument (list).  We can use the map function in conjunction with our add-one function to build a new list with each element incremented by one:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"(user=\u003e (map add-one '(1 2 3 4 5))\n(1 2 3 4 5)","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e(\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-builtin\u0022\u003emap\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;(\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e(\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e)\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

while the reduce function take a two argument function, applies it to the first two arguments in the list then successively applies the next argument in the list to the previous result until a single element is returned:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (reduce + '(1 2 3 4 5))\n15","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003ereduce\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003e+\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;(\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e3\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e4\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-number\u0022\u003e5\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e15\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Finally the apply function applies the named function to the parameter list:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"user=\u003e (apply add-one '(1))\n2","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e=\u0026#x3E;\u003c/span\u003e\u0026nbsp;(\u003cspan class=\u0022kbco-variable\u0022\u003eapply\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003eadd\u003c/span\u003e\u003cspan class=\u0022kbco-builtin\u0022\u003e-\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eone\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-string error\u0022\u003e\u0026#x27;(\u003c/span\u003e\u003cspan class=\u0022kbco-number\u0022\u003e1\u003c/span\u003e))\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-number\u0022\u003e2\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

This article touches on the basics of using Clojure - building up expressions from simple expressions, special forms, and higher order functions.  Clojure is a rich language that includes a variety of built-in data structures in addition to lists, a package system, and the ability to load and access Java code in the JVM.  For more information on working with Clojure, see the [Getting Started][5] section on [Clojure.org][1].

<!-- /wp:paragraph -->

 [1]: https://clojure.org/
 [2]: https://en.wikipedia.org/wiki/Functional_programming
 [3]: https://en.wikipedia.org/wiki/Homoiconicity
 [4]: https://clojure.org/guides/repl/introduction
 [5]: https://clojure.org/guides/getting_started
 [6]: http://repl.it
 [7]: https://clojure.org/reference/special_forms