# Timeseries Aggregations with Date Granularity

In this tutorial, we will work with the following schema

```graphql
type ActorRatings {
	actor_id: String!
	rating: Float!
	gender: Gender!
	ratedAt: DateTime!
}
enum Gender {
	Male
	Female
	NotSpecified
}
```

to  demonstrate how to use the `dateGranularity` parameter to group numeric fields over time. 

First is looking into the aggregate types for the type that you want to aggregate.

##  Aggregation Types

For each type in your schema, you get two aggregations that you can perform on them. First one is named "[your_type]" and the second one is named "[your_type]With".

Looking at our schema, our aggregations will be

```graphql
actorRatings(
	where: String
): ActorRatingsAggs
```

and

```graphql
actorRatingsWith(
    where: String
    groupBy: [ActorRatingsGroupByOptions!]!
    having: String
    first: Int
    after: String
    last: Int
    before: String
    includeTrashed: Boolean
): [ActorRatingsAggs]
```

In this tutorial we will focus on using `actorRatingsWith` since it is the one that allows grouping data.

## Using Having and GroupBy with dateGranularity

Now, let's get into some examples.

Let's say I want to get the  **average** `rating` **for each day** for the actor with `actor_id='actor1'`.
The aggregation looks like this.

```graphql	
{
  aggregate {
    actorRatingsWith(
      having: "actor_id='actor1'", 
      groupBy: [{ field: ratedAt, dateGranularity: HOURS }]) {
      rating {
        avg
        groupValues{
          key
          value
        }
      }
    }
  }
}
```

Here we are using the `actorRatingsWith` aggregation with the `groupBy` parameter pointing at the field `ratedAt` and passing the ``dateGranularity: DAYS`` parameter to indicate that we want to group by the `ratedAt` field and have the results grouped **specifically** by the **days**.

As for the data we want to be returned, we specify `avg` and then the `groupValues` so we can know the **value of the field** we are grouping by - `ratedAt`. 

> Note that the groupValues field is mandatory when using the dateGranularity parameter.

The result will look like this.

```json
{
  "data": {
    "aggregate": {
      "actorRatingsWith": [
        {
          "rating": {
            "avg": 4.5,
            "groupValues": [
              {
                "key": "ratedAt",
                "value": "2020-07-09"
              }
            ]
          }
        },
        {
          "rating": {
            "avg": 4.2,
            "groupValues": [
              {
                "key": "ratedAt",
                "value": "2020-07-10"
              }
            ]
          }
        },
        {
          "rating": {
            "avg": 3.3,
            "groupValues": [
              {
                "key": "ratedAt",
                "value": "2020-07-11"
              }
            ]
          }
        }
        .
        .
      ]
    }
  }
}
```

As you can see, the `value` field of the `groupValues`, is displaying dates with different days and the **average** is calculated for that day.

Similarly we can use all the other aggregations: `count`, `min`, `max`, `sum`.

Also, just as we did `DAYS` for the `dateGranularity` in this tutorial, you can use `HOURS`, `MINUTES` and `SECONDS` as for your needs.

In conclusion, aggregations using `dateGranularity` boils down to:

1. Using the right aggregation type - which is named "[your_type]With".
2. Using `groupBy` to specify which **field** and `dateGranularity` you would like to group by. In our example `ratedAt`, `DAYS`.
3. Using `having` if you want to filter before calculating - it is an **ArcQL** string. For more on ArcQL you can refer to the docs. In our example - `actor_id='actor1'`
4. Adding the field that you want to aggregate. In our example `rating`
5. Choosing what you want to calculate. In our example `avg` (others include `count`, `min`, `max` and `sum`)
6. Adding `groupValues` so you can the **value of the field** that you grouped by in the **result set**.