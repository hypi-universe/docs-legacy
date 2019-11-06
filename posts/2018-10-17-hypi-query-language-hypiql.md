---
ID: 581
post_title: 'Hypi Query Language &#8211; HypiQL'
author: zcourts
post_excerpt: ""
layout: post
permalink: >
  https://hypi.io/docs/technical-docs/hypi-query-language-hypiql/
published: true
post_date: 2018-10-17 21:11:43
---
<!-- wp:paragraph -->

Data, data, data everywhere.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Hypi offers a powerful query language as part of its platform. In this post we'll take an introductory look at its syntax. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Why a query language? Another query language!   
We evaluated several options when we were designing our API, in the end we simply couldn't find one that did everything we wanted AND was easily extended to support our custom features. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Hypi in the end designed a query language, HypiQL that is modelled off of the [Apache Lucene query language][1]. We went further and included some SQL like features e.g. SORT, FROM, LIMIT. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

We're currently working to launch machine learning and distributed compute which the query language will integrate with (and why it was important we could extend easily).

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Another reason we went for HypiQL is SQL and other options we considered were not a very good fit as our API is GraphQL based, GraphQL is already the means by which we perform data selections and it excels at this. What is missing from GraphQL is the capability to filter, which the standard left as an exercise to the reader!

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

HypiQL is made up of four major components.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

`<query> <sort> <from> <limit>` i.e. it is very SQL like. Designed intentionally so to help make the learning curve as small as possible for third party developers. If they’re familiar with SQL or the Lucene query language they’ll probably be able to write HypiQL queries by just guessing at it.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Let’s break the four components down but leave query for last since it is the most complex.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## `<sort>` - For specifying how to sort matching results {#markdown-header-sort-for-specifying-how-to-sort-matching-results}

<!-- /wp:heading -->

<!-- wp:paragraph -->

`SORT fieldName (ASC|DESC)? (,fieldName ASC|DES)*`

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Examples:

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">SORT a
SORT a ASC
SORT a DESC
SORT a, b.c DESC, c
</pre>

<!-- /wp:preformatted -->

<!-- wp:heading -->

## `<from>` - For specifying a paging token {#markdown-header-from-for-specifying-a-paging-token}

<!-- /wp:heading -->

<!-- wp:paragraph -->

`` FROM 'some token` `` this is all there is to it. When you search, every object returned by the API includes their paging token in the special `hypi` field. Take the token from the last object we returned to you and pass it back. We will then send back results after this object.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## `<limit>` - For limiting the number of results returned {#markdown-header-limit-for-limiting-the-number-of-results-returned}

<!-- /wp:heading -->

<!-- wp:paragraph -->

`LIMIT 50` this is all there is to it, when you search we will impose a max limit the query, currently `1024`.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## `<query>` - The filter(s) {#markdown-header-query-the-filter40s41}

<!-- /wp:heading -->

<!-- wp:paragraph -->

Firstly, there are different types of queries. Currently these are:

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  Term queries
2.  Phrase queries
3.  Prefix queries
4.  Wildcard queries
5.  Fuzzy queries
6.  Range queries
7.  Match all queries

<!-- /wp:list -->

<!-- wp:paragraph -->

Though they are not query types in their own right, we also support two assertions that can be combined with any of the available queries, these are:

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `EXIST fieldName` - only return results where `fieldName` **does** exists
2.  `NOT EXIST fieldName` - only return results where `fieldName` **does not** exist

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### TERM queries {#markdown-header-term-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A term query is a simple filter asking to return results that match the value provided exactly. Examples:

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">a = 'some string'
a = 123
a = 'some string' OR 123 AND 'abc'
</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

Boolean Logic is possible on all query types. The general form is as demonstrated on line 3 (the last example). The last example says "return objects where field a is `some string` or where a is `123` AND a is `abc`".

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

*This query is non-sensical because and will only return objects that have a set to* `abc` *.*

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

*The reason for this is that* `AND` *is treated as an absolute assertion requiring that the given field* `MUST` *have the requested value in order for it to match.*

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Phrase queries {#markdown-header-phrase-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A phrase query is similar to what an end user might expect a search engine to do. You search for `New York` it will return objects containing this exact phrase or the individual words.

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">a ~ 'some string'
a ~ 123
a ~ 'some string' OR 123
</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

‌

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Prefix queries {#markdown-header-prefix-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A prefix query will take the terms you’ve searched for and match any object where the contents of the field starts with those terms

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">a ^ 'some string'
a ^ 123
a ^ 'some string' OR 123
</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

‌

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Wildcard queries {#markdown-header-wildcard-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A wildcard query takes the terms searched for and treats `*` and `?` as special characters.

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `*` means match anything from this point onwards
2.  `?` means match any **single character** at this positiona * 'some *'  
    a * 123*  
    a * 'some?str*' OR 123

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### Fuzzy queries {#markdown-header-fuzzy-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A fuzzy query takes the terms searched for and tries to match words that are similar even if spelt slightly differently e.g. `tame`, `name` and `game` would match if you searched for `tame.`

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">~ a ~ 'some string'
~ a ~[1] 'some string' OR 'other string'
~ a ~[1,5] 'some string' OR 'other string'
~ a ~[1,5,10] 'some string' OR 'other string'
~ a ~[1,5,10,true] 'some string' OR 'other string'
</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

The numbers and the boolean all you to tweak how the fuzzy algorithm runs. The parameters are

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `max edits`
2.  `prefix length`
3.  `max expansion`
4.  `allow transpositions`

<!-- /wp:list -->

<!-- wp:paragraph -->

In that order.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### Range queries {#markdown-header-range-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

Range queries are a means for you to search for content that falls within the given range.

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">a IN [0, 1)
a IN (0, 1]
a IN (0, 1)
a IN [0, 1]
//any of the above can also use boolean logic e.g.
a IN [0, 1 OR 5,10 AND 10, 11)
//all of the above also works for strings
a IN ['America', 'Jamaica')
</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

These are the standard mathematical representations of ranges and work exactly as you’d expect i.e.

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `[0, 1)` - left inclusive, i.e. including 0, excluding 1
2.  `(0, 1]` right inclusive, i.e. excluding 0, including 1
3.  `(0, 1)` exclusive, i.e. not including 0 or 1, only those between
4.  `[0, 1]` inclusive, i.e. including both 0, 1 and everything in between

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### Match all queries {#markdown-header-match-all-queries}

<!-- /wp:heading -->

<!-- wp:paragraph -->

A match all query is simple a query with the value `*`, it will return all documents unless other filters restrict it.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

‌

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Combining the various queries work as expected

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">a = 'something' OR b ~ 'New York' AND c ^ 'alpha' OR ~d~ "something" OR a IN [0,10)
</pre>

<!-- /wp:preformatted -->

 [1]: https://lucene.apache.org/core/2_9_4/queryparsersyntax.html