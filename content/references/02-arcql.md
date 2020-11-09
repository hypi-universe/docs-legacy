---
title: "ArcQL Filtering"
metaTitle: "Hypi tutorial for ArcQL"
metaDescription: "How to find data in the Hypi platform using ArcQL"
---

## Introduction
A SQL-like query language used to filter and sort data in the platform.
Hypi offers a powerful query language as part of its platform.

## Query Structure
ArcQL is made up of four major components.



`<query> <sort>`  i.e. it is very SQL like. Designed intentionally so to help make the learning curve as small as possible for our developers.
If you’re familiar with SQL or the Lucene query language you’ll probably be able to write ArcQL queries by just guessing at it.
Let’s break the four components down but leave query for last since it is the most complex.


### ArcQL: Sorting
For specifying how to sort matching results
**Examples:** `{arcql: fieldName SORT hypi.created ASC|DES}`

1. `SORT a`
2. `SORT a ASC`
3. `SORT a DESC`
4. `SORT a, b.c DESC, c`

### ArcQL Term Query
A term query is a simple filter asking to return results that match the value provided exactly. Examples:

    a = 'some string'
    a = 123
    a = 'some string' OR 123 AND 'abc'

Boolean Logic is possible on all query types. The general form is as demonstrated on line 3 (the last example). The last example says “return objects where field a is
`some string` or where a is `123`  `AND` a is `abc`

> This query is non-sensical because and will only return objects that have a set to  `abc`.  The reason for this is that `AND` is treated as an absolute assertion requiring that the given field `MUST`  have the requested value in order for it to match.

### ArcQL Phrase Query
A phrase query is similar to what an end user might expect a search engine to do. You search for  `New York` it will return objects containing this exact phrase or the individual words.

 **Example** `fieldName ~ '${query}' OR fieldName ~ '${query}' OR fieldName ~ '${query}' fieldName ~  '${query}'`;

    a ~ 'some string'

    a ~ 123

    a ~ 'some string' OR 123
<br/>
<br/>


### ArcQL EXIST
**Example** `EXIST a`
This asserts that the field `a` exists i.e. only data where the field exists will match
### ArcQL NOT EXIST
**Example** `NOT EXIST b`
This asserts that the field `b` does *not* exist i.e. only data where the field does NOT exist will match

### ArcQL Prefix Query
A prefix query will take the terms you’ve searched for and match any object where the contents of the field starts with those terms
    a ^ 'some string'

    a ^ 123

    a ^ 'some string' OR 123

### ArcQL Wildcard Query
A wildcard query takes the terms searched for and treats  `*` and `?` as special characters.
`*` Means match anything from this point onwards
`?` Means match any single character at this position

    a * 'some'

    a * 123

    a * 'some?str*' OR 123

<div></div>
<br/>

### ArcQL Fuzzy Query
A fuzzy query takes the terms searched for and tries to match words that are similar even if spelt slightly differently e.g. `tame` `name` and `game`  would match if you searched for `tame`

    ~ a ~ 'some string'

    ~ a ~[1] 'some string' OR 'other string'

    ~ a ~[1,5] 'some string' OR 'other string'

    ~ a ~[1,5,10] 'some string' OR 'other string'

    ~ a ~[1,5,10,true] 'some string' OR 'other string'

The numbers and the boolean all you to tweak how the fuzzy algorithm runs. The parameters are `1. max edits` `2. prefix length` ` 3. max expansion`  `4. allow transpositions`  In that order.

### ArcQL Range Query
Range queries are a means for you to search for content that falls within the given range.
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
Combining the various queries work as expected
`(a = 'something' OR b ~ 'New York') AND (c ^ 'alpha' OR ~d~ "something" OR a IN [0,10))`

### ArcQL REF FROM
Hypi is a polyglot storage service, one of the supported storage paradigms is for graph data, see the API Guide for more information. ArcQL has support for querying graph data.

`REF FROM '<Origin Type>' ON '<Origin Field>' FOR '<Origin ID>' WHERE <ArcQL filter>`

1. `Origin Type` is the name of the GraphQL type from which you would like to find edges
1. `Origin Field` is the name of the field on the Origin Type for which the edge exists
1. `Origin ID` is the ID of the object/vertex to find references from
1. `ArcQL filter` is any valid ArcQL query, this is optional and if present will only return edges that match

### ArcQL Geo Location
Hypi allows developers to run search within a radius of a point defined by longitude and latitude.

`geo(latitude, longitude, radius, latitudeFieldName, longitudeFieldName)`

1. `latitude`: defined in radians by `latitude * Pi / 180`
1. `longitude`: defined in radians by `longitude * Pi / 180`
1. `radius`: defined in kilometers, for example, 0.5 stands for 500 meters
1. `latitudeFieldName`: The name of the latitude field as defined on the GraphQL type
1. `longitudeFieldName`: The name of the longitude field as defined on the GraphQL type

`latitudeFieldName` and `longitudeFieldName` give the developers the flexibility to use any float/double decimal point numbers as the source of latitude and longitude. For example, assume that a type `GPS` is defined in your App schema as follows:

```graphql
type GPS {
    x: Float
    y: Float
}
```

Then, in this case, `latitudeFieldName` should be set to `x`, and `longitudeFieldName` should be set to `y`.

In order to query the locations within a radius of 500 meters of a point degrees(31.9913129, 34.8661077) which is equal to radians(0.55835, 0.60852). Then, the query should look like this:
```graphql
{
    find(
        type:GPS,
        arcql:"geo(0.55835,0.60852,0.5,'x','y')"
    ) {
        edges{
            node{
                ... on GPS {
                    hypi {
                        id
                    }
                    x
                    y
                }
            }
        }
    }
}
```

In summary, the Geo Location features of ArcQL, can be described to satisfy the following:
* Any object with float fields can be used - not just GPS as shown in example
* The value of the fields MUST be radians NOT degrees

Another example:

Create some data - again, x and y values are in **radians** not degrees.
```graphql
mutation {
  upsert(
    values: {
      GPS: [
        {x: 0.55835374214, y: 0.6084901767 }
        {x: 0.55835374214, y: 0.6084901767 }
        {x: -0.41167494186, y: -0.81812175344 }
        {x: -0.41786913283, y: -0.80969561972 }
        {x: -0.41776046165, y: -0.81033767224 }
        {x: 0.89901594913, y: -0.002154727644 }
        {x: 0.89938548071, y: -0.0022373637481 }
        {x: 0.90000538675, y: -0.0027382086662 }
        {x: 0.55843351241, y: 0.60848146576 }
        {x: 0.55769501648, y: 0.60841038723 }
        { x: 0.55831914971, y: 0.60843128929 }
      ]
    }
  ) {
    id
  }
}
```
Now we can find or objects within a given radius:

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  find(type: GPS, arcql: "geo(0.55835374214,0.60852837672,0.5,'x','y')") {
    edges {
      node {
        ... on GPS {
          x
          y
        }
      }
    }
  }
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "find": {
      "edges": [
        {
          "node": {
            "x": 0.55835374214,
            "y": 0.6084901767
          }
        },
        {
          "node": {
            "x": 0.55835374214,
            "y": 0.6084901767
          }
        }
      ]
    }
  }
}
```
</div>

</div>
