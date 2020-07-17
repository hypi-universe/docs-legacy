---
title: "Workflows"
metaTitle: "Hypi Platform CRUD Documentation"
metaDescription: "Hypi platform documentation for the core app's CRUD operations generated for each app"
---

## Overview

When you have a situation where one event can lead to potentially many other events, a workflow can be used to help simplify how the work is done.
Hypi workflows enable steps defined by your app to execute in the order you specify.

For this page we've added the following schema

```graphql
type MyType {
  a: Int
  previous: Json
  session: WorkflowSession,
  params: Json
}

type Query {
  step0: Int @tan(type:Groovy, inline: "17")
  step1(a:Int, b: Int): Int @tan(type:Groovy, inline: "a * b")
  step3(a: Int, previous: String, session: WorkflowSessionInput, params: Json): MyType @tan(type:Groovy, inline: """
  return [
    "a": a,
    "previous": previous,
    "session": session,
    "params": params
  ]
  """)
  calculateStuff(a: Int, b: Int): MyType @workflow(name: "calculate-stuff")
}

type Mutation {
  #For no reason other than to test mutation steps - it's entirely up to the author to decide if their custom function is mutation or not
  step2(b:Int, previous: Int): String @tan(type:Groovy, inline: "'v:' + (b + previous)")
}

```

The `workflow` directive is Hypi's mechanism for enabling you to trigger a given workflow.
In thie case we've defined `calculateStuff` which, when called will execute the `calculate-stuff` workflow.

## Example

Once defined, Workflow functions can be executed just like any other.
The first thing required is that you must create a `Workflow` object.

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
mutation Upsert($values: HypiUpsertInputUnion!) {
  upsert(values: $values) {
    id
  }
}
# Data
{
  "values": {
    "Workflow": [
      {
        "name": "calculate-stuff",
        "steps": [
          {
            "name": "step0",
            "order": 0,
            "fn": {
              "type": "Query",
              "field": "step0"
            }
          },
          {
            "name": "step1",
            "order": 1,
            "fn": {
              "type": "Query",
              "field": "step1"
            }
          },
          {
            "name": "step2",
            "order": 2,
            "fn": {
              "type": "Mutation",
              "field": "step2"
            }
          },
          {
            "name": "step3",
            "order": 3,
            "fn": {
              "type": "Query",
              "field": "step3",
              "selection": "a previous params session{data{stepName,stepResult}}"
            }
          }
        ]
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
        "id": "01EDDSH2G07G04D6KHF79R74JT"
      }
    ]
  }
}
```
</div>

</div>

Once created, the workflow can then be executed.

> Important
>
> The name of the workflow is important. Notice it is used in the function definition `@workflow(name: "calculate-stuff")`. This is the same name used in the object created.
>
> The order field in each step determines when that step is executed
>
> The `fn` field is a reference to a `Query` or `Mutation` function that should be executed for that step.
>
> If you use a variable called `previous` that is the same type as the output from the previous step, Hypi will pass the output from the previous step as the value of this parameter.
>
> If you have a `session: WorkflowSessionInput` variable, Hypi will pass the session object. It will contain the results of all the steps executed so far.

Finally, to use this workflow, execute it like any other function.

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
query Q($a: Int, $b: Int){calculateStuff(a: $a, b:$b){
  a previous params
  session{
    data{
        stepName
        stepResult
      }
    }
  }
}
# Data
{
  "a": 10,
  "b": 2
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "calculateStuff": {
      "a": 10,
      "previous": "v:22",
      "params": {
        "a": 10,
        "b": 2
      },
      "session": {
        "data": [
          {
            "stepName": "step0",
            "stepResult": 17
          },
          {
            "stepName": "step1",
            "stepResult": 20
          },
          {
            "stepName": "step2",
            "stepResult": "v:22"
          }
        ]
      }
    }
  }
}
```
</div>

</div>

This example is very simple, but you can make your workflow do anything necessary for your app.
