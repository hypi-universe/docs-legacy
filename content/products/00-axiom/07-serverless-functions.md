---
title: "Serverless functions"
metaTitle: "Hypi Platform Serverless Functions Documentation"
metaDescription: "Hypi platform documentation for its serverless functions support"
---

## Overview

Serverless technology are a means of adding custom behaviour without having to worry too much about infrastructure, deployment or maintenance.

### How to setup and use a serverless?
* Create an App
* Get App ID
* Create Serverless
* Define @tan directive
* Trigger Function

## Create an App
Reference the create app guide [Hypi Platform App Documentation](/products/axiom/app)

## Get App ID
Run the following GraphQL query to retrieve the App ID available as hypi.id. Note that the query returns multiple apps in your realm, so pick the one related the App that you have just created in the previous step.
<div className={"code-container"}>

<div className={"code-column"}>

```graphql
{
  find(type: App, arcql:"*"){
    edges{
      node{
        ... on App {
          name
          releases{
            hypi {
              id
            }
            name
          }
        }
      }
      cursor
    }
  }
}
```

</div>
</div>

## Create Serverless
At this point, you are ready to create the Serverless function. In order to create a serverless you should already have a containerized image  ready to deploy available either in a public or a private docker registry.
<div className={"code-container"}>

<div className={"code-column"}>

```graphql
mutation upsert($values:HypiUpsertInputUnion!) {
  upsert(values:$values){
    id
  }
}
```

</div>
</div>

Under the query variables, you can supply the actual parameters. Note that the parameters are a typical JSON payload. The values supplied here are for illustrative purposes only, and you need to edit them to match your use case.
<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  "values": {
    "App": {
      "name": "test-serverless",
      "hypi": {
        "id": "01EJX6A9VWTV3EMDKRMW9G757X"
      },
      "releases": [
        {
          "name": "initial",
          "hypi": {
            "id": "01EJX6BHM5YDNX30DWTNWJB5DH"
          },
          "serverless": {
            "hypi": {
              "impl": "OpenFaaSFn"
            },
            "image": "functions/alpine:latest",
            "name": "count-app",
            "credentials": {
              "server": "hub.docker.com",
              "username": "example",
              "password": "example"
          }
        }
      ]
    }
  }
}
```

</div>
</div>

#### Verify that the serverless was created
In order to double check that the serverless was created successfully, then run the following GraphQL query and make sure that the serverless name exists in the retrieved list.
<div className={"code-container"}>

<div className={"code-column"}>

```graphql
{
  find(type: App, arcql:"*"){
    edges{
      node{
        ... on App {
          name
          releases{
            name
            serverless{
              ... on OpenFaaSFn{
                name
                image
                credentials {
                  server
                  username
                  password
                }
              }
            }
          }
        }
      }
      cursor
    }
  }
}
```

</div>
</div>

## Define @tan directive
Before you start using the serverless function, you need to define a GraphQL query type that provides the parameters of the function. Here is an example definition.
<div className={"code-container"}>

<div className={"code-column"}>

```graphql
  f1(a: String, b: Int, c: Boolean):Json @tan(type:OpenFaaS, name:"count-app", handler:"wc -m")
```

</div>
</div>

This has just defined a @tan function that accepts 3 parameters of types String, Integer, and Boolean. It returns a JSON object.
The @tan directive has a few options; type, name, handler, and saveAs. They are explained below:
* type: instructs the system on which serverless backend to use, currently only OpenFaaS is available.
* name: the name field should match the name provided under the GraphQL "serverless" object.
* handler: is the script/entrypoint to execute inside the container. For example, "python main.py -env=prod" or "go run quickstart.go" ... etc.
* saveAs: instructs the ArcOS system to persist the result of the serverless function call as a GraphQL type in the database. For example, saveAs: "ServerlessResponse".

## Trigger Function

It is now time to run the function and pass some real values and obtain the results. Using a query like this:
<div className={"code-container"}>

<div className={"code-column"}>

```graphql
    f1(a: "hello, @tan", b: 2376, c: true);
```

</div>
</div>
