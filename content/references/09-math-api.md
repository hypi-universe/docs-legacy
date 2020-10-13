---
title: "Math API"
metaTitle: "Hypi Platform Math API Documentation"
metaDescription: "Hypi platform documentation for the various Math operations available via the API"
---

## Overview
There are many cases where you want to do some standard math on your data.
One approach to this is to get the value of the field and perform these operations client side.
While this works it is probably not safe in many cases.
What happens if two independent clients try to modify the same field? You will end up with the last operation succeeding and the first ones being lost.

It is this kind of scenario that the Hypi Math API is designed to prevent.

## Generated API

For this documentation we will use the following schema

```graphql
enum RatingType { POSITIVE, NEGATIVE}

type Rating {
  value: Float!
  type: RatingType!
}
```

From this, Hypi will generate the following input types for you:

```graphql
input  RatingMaths {
  value: MathInputFloat
}
input MathInputFloat {
  div: Float
  times: Float
  minus: Float
  plus: Float
  hypi: HypiInput!
}
```

As you can see, only the `value` field is included in the generated input type.

The precedence of the operations follows [BODMAS](https://en.wikipedia.org/wiki/Order_of_operations). For clarity if all fields are specified the precedence is:

1. Divsion
2. Multiplication
3. Subtraction
4. Addition
i.e. if you specify a value for all of the fields, this is the order in which they will apply.

> Notice the numeric field
>
> Hypi generates an API which lets you perform math operations on numeric fields only.
>
> Math operations can only be performed on an object that already exist.

## Example

As noted, the object must exist before you can perform math operations on it.
Create a rating using `upsert`.

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
mutation Upsert($values: HypiUpsertInputUnion!) {
  upsert(values: $values) {
    id
  }
}

# Variables
{
  "values": {
    "Rating": [
      {
        "hypi": {
          "id": "rating1"
        },
        "value": 3,
        "type": "POSITIVE"
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
      }
    ]
  }
}
```
</div>

</div>

Now you're able to execute math operations on the numeric field.

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
mutation {
  math(
    values: {
      Rating: [
        {
          value: {
            hypi: { id: "rating1" }
            div: 3
            times: 10
            minus: 2
            plus: 30
          }
        }
      ]
    }
  ) {
    id
  }
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "math": [
      {
        "id": "rating1"
      }
    ]
  }
}
```
</div>

</div>

In this example, we are using all the math operators available in the API.

Notice that we add `hypi: { id: "rating1" }` - this is how we told Hypi which rating object we're operating on.

Notice as well that the query uses an array (the square brackets) so you can perform math operation on multiple objects (and even multiple types) in one request.

The order of execution is as follows:

1. value = 3 (we created the rating with a value of 3)
2. 3 / 3 = 1
3. 1 * 10 = 10
4. 10 - 2 = 8
5. 8 + 30 = 38

Now, if you query the rating value that was originally set to 3 when we created it.
Its value has changed to 38.

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  get(type: Rating, id: "rating1"){
    ... on Rating {
      hypi{
        id
        created
        updated
      }
      value
      type
    }
  }
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "get": {
      "hypi": {
        "id": "rating1",
        "created": "2020-07-15T09:20:55Z",
        "updated": "2020-07-15T09:23:23Z"
      },
      "value": 38,
      "type": "POSITIVE"
    }
  }
}
```
</div>

</div>

