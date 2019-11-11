---
title: "ArcQL Filtering"
metaTitle: "Hypi tutorial for ArcQL"
metaDescription: "How to find data in the Hypi platform using ArcQL"
---

## Introduction
A SQL-like query language used to filter, sort and paginate data in the platform.
Hypi offers a powerful query language as part of its platform.

ArcQL is modelled off of the Apache Lucene query language. We went further and included some SQL like features e.g. SORT, FROM, LIMIT.

## Query Structure
‌ArcQL is made up of four major components.



`<query> <sort> <from> <limit>`  i.e. it is very SQL like. Designed intentionally so to help make the learning curve as small as possible for third party developers. 
If they’re familiar with SQL or the Lucene query language they’ll probably be able to write ArcQL queries by just guessing at it.
‌Let’s break the four components down but leave query for last since it is the most complex.




### ArcQL Pagination
For specifying a paging token
`FROM` 'some token'  this is all there is to it. When you search, every object returned by the API includes their paging token in the special hypi   field. Take the token from the last object we returned to you and pass it back. We will then send back results after this object.  
**Examples:** `${_arcql} LIMIT ${limit} FROM ${fromToken}`

### ArcQL: Sorting
For specifying how to sort matching results
**Examples:** `{arcql: fieldName SORT hypi.created ASC|DES}‌`                       
1. `SORT` a  2. `SORT` a `ASC` 3. `SORT` a `DESC` 4. `SORT` a, b.c `DESC`, c

### ArcQL Limiting
For limiting the number of results returned, `LIMIT 50`  this is all there is to it, when you search we will impose a max limit the query, currently `1024`.
**Examples:** `${_arcql} LIMIT ${limit}`                      

### ArcQL Term Query
A term query is a simple filter asking to return results that match the value provided exactly. Examples:

    a = 'some string'
    a = 123
    a = 'some string' OR 123 AND 'abc'
 
‌Boolean Logic is possible on all query types. The general form is as demonstrated on line 3 (the last example). The last example says “return objects where field a is 
`some string` or where a is `123`  `AND` a is `abc`

> This query is non-sensical because and will only return objects that have a set to  `abc`.  ‌The reason for this is that `AND` is treated as an absolute assertion requiring that the given field `MUST`  have the requested value in order for it to match. 
    
### ArcQL Phrase Query
A phrase query is similar to what an end user might expect a search engine to do. You search for  `New York` it will return objects containing this exact phrase or the individual words.
  
 **Example** `fieldName ~ '${query}' OR fieldName ~ '${query}' OR fieldName ~ '${query}' fieldName ~  '${query}'`;
   
    a ~ 'some string'
     
    a ~ 123
     
    a ~ 'some string' OR 123
<br/>  
<br/>

    
### ArcQL EXIST
TODO
### ArcQL NOT EXIST
TODO

### ArcQL Prefix Query
A prefix query will take the terms you’ve searched for and match any object where the contents of the field starts with those terms
    a ^ 'some string'
     
    a ^ 123
     
    a ^ 'some string' OR 123
.
    
### ArcQL Wildcard Query
A wildcard query takes the terms searched for and treats  `*` and `?` as special characters.
`*` Means match anything from this point onwards
`?` Means match any single character at this position 
   
    a * 'some' 
     
    a * 123 
     
    a * 'some?str*' OR 123
.   
   
### ArcQL Fuzzy Query
A fuzzy query takes the terms searched for and tries to match words that are similar even if spelt slightly differently e.g. `tame` `name` and `game`  would match if you searched for `tame`
    
    ~ a ~ 'some string'
     
    ~ a ~[1] 'some string' OR 'other string'
     
    ~ a ~[1,5] 'some string' OR 'other string'
     
    ~ a ~[1,5,10] 'some string' OR 'other string'
     
    ~ a ~[1,5,10,true] 'some string' OR 'other string'

The numbers and the boolean all you to tweak how the fuzzy algorithm runs. The parameters are `1. max edits` `2. prefix length` ` 3. max expansion`  `4. allow transpositions`  In that order.

### ArcQL Range Query
‌Range queries are a means for you to search for content that falls within the given range.
    a IN [0, 1)
     
    a IN (0, 1]
     
    a IN (0, 1)
     
    a IN [0, 1]
     
    //any of the above can also use boolean logic e.g.
     
    a IN [0, 1 OR 5,10 AND 10, 11)
     
     
     
    //all of the above also works for strings
     
    a IN ['America', 'Jamaica')

These are the standard mathematical representations of ranges and work exactly as you’d expect i.e.

1. `[0,1)` left inclusive, i.e. including 0, excluding 1 
1. `(0,1]` right inclusive, i.e. excluding 0, including 1
1. `(0,1)` exclusive, i.e. not including 0 or 1, only those between
1. `[0,1]` inclusive, i.e. including both 0, 1 and everything in between

### ArcQL Match All Query
A match all query is simple a query with the value *, it will return all documents unless other filters restrict it.
‌‌Combining the various queries work as expected
`(a = 'something' OR b ~ 'New York') AND (c ^ 'alpha' OR ~d~ "something" OR a IN [0,10))`

### ArcQL REF FROM 
‌Hypi is a polyglot storage service, one of the supported storage paradigms is for graph data, see the API Guide for more information. ArcQL has support for querying graph data.

`REF FROM '<Origin Type>' ON '<Origin Field>' FOR '<Origin ID>' WHERE <ArcQL filter>`

1. `‌Origin Type` is the name of the GraphQL type from which you would like to find edges
1. `Origin Field` is the name of the field on the Origin Type for which the edge exists
1. `Origin ID` is the ID of the object/vertex to find references from
1. `ArcQL filter` is any valid ArcQL query, this is optional and if present will only return edges that match
