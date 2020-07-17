---
title: "Aggregations API"
metaTitle: "Hypi Platform Aggregations Documentation"
metaDescription: "Hypi platform documentation for the aggregations API"
---

## Overview

It's common to want to measure various things. By measuring we can gain insights into how things are performing and more.
In Hypi, you can use the aggregations API to start to get insights about the data in your apps.

Aggregations, like many other APIs are automatically generated.
Any scalar field can be aggregated in at least one way.

String fields can only be counted or grouped whilst numeric fields have a range of mathematical operations which can be used to perform aggregations on them.
For both Int and Float fields, the following operations are possible:

1. `avg` - calculates the average of a field
2. `count` - count the number of entries with the given field
3. `sum` - sums the field
4. `max` - finds the max value of a field
4. `min` - finds the min value of a field

## Generated types

On this page we'll use the following schema:
```graphql
type Message {
    content: String!
    from: Account
    to: Account
}

enum RatingType { POSITIVE, NEGATIVE}

type Rating {
  value: Float!
  type: RatingType!
}
```
Each app has `HypiAggregationType` which is a type dynamically generated based on your app's schema.
In this case there will be something similar to
```graphql
type HypiAggregationType {
  message(where: String): MessageAggs
  messageWith(where: String, groupBy: [MessageGroupByOptions!]!,having: String, first: Int, after: String, last: Int, before: String, includeTrashed: Boolean): [MessageAggs]
  rating(where: String): RatingAggs
  ratingWith(where: String, groupBy: [RatingGroupByOptions!]!,having: String, first: Int, after: String, last: Int, before: String, includeTrashed: Boolean): [RatingAggs]
  ...
}
```

| Parameter | Description |
|-|-|
| where | Filters rows before they are summarised into groups by the GROUP BY clause  |
| groupBy | Combines rows into groups based on matching values in specified columns. One row is returned for each group. |
| having | Filters rows after the results are grouped |
| first | Limit the number of results returned when used with the **after** parameter |
| after | Return data after this token. This is the ID of an object returned previously that you'd like to get results following it |
| last | Limit the number of results returned when used with the **before** parameter |
| before | Return data before this token. This is the ID of an object returned previously that you'd like to get results before it |

The are two fields per type. The main difference as you can see is the parameters.
The simpler method, does not have a `groupBy` or `having` parameters.
The `groupBy` type changes depending on the type.
Here we have `MessageGroupByOptions` and `RatingGroupByOptions`. This type changes because it uses the fields from the respective type.

```graphql
input MessageGroupByOptions {
  field: MessageScalarFields!
  order: AggOrder
  dateGranularity: TimeUnit
}

input RatingGroupByOptions {
  field: RatingScalarFields!
  order: AggOrder
  dateGranularity: TimeUnit
}

enum RatingScalarFields {
  value
  type
}

enum MessageScalarFields {
  content
}
```
The key difference is between `RatingScalarFields` and `MessageScalarFields` where each contains the name of the fields from their associated type.

## Examples
For the examples below we will need some data. Use add these entries to be able to get the results shown in the example.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
mutation Upsert($values: HypiUpsertInputUnion!) {
  upsert(values: $values) {
    id
  }
}
#Data
{
  "values": {
    "Rating": [
      {
        "hypi": {"id": "rating1"},
        "value": 4,
        "type": "POSITIVE"
      },
      {
        "hypi": {"id": "rating2"},
        "value": 4,
        "type": "POSITIVE"
      },
      {
        "hypi": {"id": "rating3"},
        "value": 2,
        "type": "NEGATIVE"
      },
      {
        "hypi": {"id": "rating4"},
        "value": 3,
        "type": "POSITIVE"
      },
      {
        "hypi": {"id": "rating5"},
        "value": 5,
        "type": "POSITIVE"
      },
      {
        "hypi": {"id": "rating6"},
        "value": 1,
        "type": "NEGATIVE"
      },
      {
        "hypi": {"id": "rating7"},
        "value": 5,
        "type": "POSITIVE"
      },
      {
        "hypi": {"id": "rating8"},
        "value": 1,
        "type": "NEGATIVE"
      },
      {
        "hypi": {"id": "rating9"},
        "value": 2,
        "type": "NEGATIVE"
      },
      {
        "hypi": {"id": "rating10"},
        "value": 2,
        "type": "NEGATIVE"
      }
    ]
  }
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "upsert": [
      {
        "id": "rating1"
      },
      {
        "id": "rating2"
      },
      {
        "id": "rating3"
      },
      {
        "id": "rating4"
      },
      {
        "id": "rating5"
      },
      {
        "id": "rating6"
      },
      {
        "id": "rating7"
      },
      {
        "id": "rating8"
      },
      {
        "id": "rating9"
      },
      {
        "id": "rating10"
      }
    ]
  }
}
```
</div>

</div>

### Example 1 - no filters

In this example we want to aggregate all the ratings.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  aggregate{
    rating{
      value{
        avg
        count
        max
        min
        sum
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
    "aggregate": {
      "rating": {
        "value": {
          "avg": 2.9,
          "count": 10,
          "max": 5,
          "min": 1,
          "sum": 29
        }
      }
    }
  }
}
```
</div>

</div>

> Select only what you need
>
> By selecting the aggregation field, it will be calculated and returned.
Do not select a field if it's not needed, Hypi will only do the work to perform these calculations if you select the field.
This means you can get faster queries by selecting less when the others are not needed.

### Example 2 - aggregate distinct rows

In this example we want to aggregate only unique ratings.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  aggregate{
    rating{
      value{
        avg(distinct: true)
        count(distinct: true)
        sum(distinct: true)
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
    "aggregate": {
      "rating": {
        "value": {
          "avg": 3,
          "count": 5,
          "sum": 15
        }
      }
    }
  }
}
```
</div>

</div>

### Example 2 - aggregate matching rows

In this example we want to aggregate only positive ratings.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  aggregate{
    rating(where: "type = 'POSITIVE'"){
      value{
        avg
        count
        sum
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
    "aggregate": {
      "rating": {
        "value": {
          "avg": 4.2,
          "count": 5,
          "sum": 21
        }
      }
    }
  }
}
```
</div>

</div>

### Example 3 - group by

In this example we want to aggregate and group by type.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  aggregate {
    ratingWith(groupBy: [{ field: type, order: ASC }]) {
      value {
        avg
        count
        sum
        groupValues {
					key
					value
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
    "aggregate": {
      "ratingWith": [
        {
          "value": {
            "avg": 1.6,
            "count": 5,
            "sum": 8,
            "groupValues": [
              {
                "key": "type",
                "value": "NEGATIVE"
              }
            ]
          }
        },
        {
          "value": {
            "avg": 4.2,
            "count": 5,
            "sum": 21,
            "groupValues": [
              {
                "key": "type",
                "value": "POSITIVE"
              }
            ]
          }
        }
      ]
    }
  }
}
```
</div>

</div>

As you can see, we use the `groupBy` field, which accepts a list of fields and options about the field such as sort order.
In this case there are two possible values for `type`, so we have two groups in the results.

### Example 4 - aggregate by date

In this example we want to aggregate and group by a `DateTime field`.
<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  aggregate {
    ratingWith(
      groupBy: [{ field: hypi_updated, dateGranularity: MINUTES }]
    ) {
      value {
        avg
        count
        sum
        groupValues {
          key
          value
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
    "aggregate": {
      "ratingWith": [
        {
          "value": {
            "avg": 2.2,
            "count": 5,
            "sum": 11,
            "groupValues": [
              {
                "key": "hypi_updated",
                "value": "2020-07-17 04:14"
              }
            ]
          }
        },
        {
          "value": {
            "avg": 4,
            "count": 2,
            "sum": 8,
            "groupValues": [
              {
                "key": "hypi_updated",
                "value": "2020-07-17 04:42"
              }
            ]
          }
        },
        {
          "value": {
            "avg": 3.3333333333333335,
            "count": 3,
            "sum": 10,
            "groupValues": [
              {
                "key": "hypi_updated",
                "value": "2020-07-17 04:43"
              }
            ]
          }
        }
      ]
    }
  }
}
```
</div>

</div>

> Only `DateTime` fields
>
> Only date time fields can use the `dateGranularity` parameter

