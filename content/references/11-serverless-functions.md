---
title: "Serverless functions"
metaTitle: "Hypi Platform Serverless Functions Documentation"
metaDescription: "Hypi platform documentation for its serverless functions support"
---

## Overview

Serverless technology are a means of adding custom behaviour without having to worry too much about infrastructure,
deployment or maintenance. Hypi supports both of OpenFaaS and OpenWhisk serverless functions.

## Outline
* OpenFaaS Serverless Functions
* OpenWhisk Serverless Functions

### OpenFaaS Serverless Functions
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
            "name": "echo-app",
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
type Query {
    f1(a:String!, b: Int!, c:Boolean!):EchoType @tan(type:OpenFaaS, name:"echoit", handler:"cat")
}

type EchoType {
        a: String
        b: Int
        c: Boolean
}
```

</div>
</div>

This has just defined a @tan function that accepts 3 parameters of types String, Integer, and Boolean. It returns a JSON object.
The @tan directive has a few options; type, name, handler, and saveAs. They are explained below:
* type: instructs the system on which serverless backend to use, currently OpenFaaS is available as well as inline scripts written in Groovy or Velocity.
* name: the name field should match the name provided under the GraphQL "serverless" object.
* handler: is the script/entrypoint to execute inside the container. For example, "python main.py -env=prod" or "go run quickstart.go" ... etc.
* saveAs: instructs the Hypi platform to persist the result of the serverless function call as a GraphQL type in the database. For example, saveAs: "ServerlessResponse".

Observe here how the @tan directive is instructed to return payload of user-defined type "EchoType". Thus, any user-defined type can be returned.

## Trigger Function

It is now time to run the function and pass some real values and obtain the results. Using a query like this:
<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```graphql
query{
    f1(a:"Hello, @tan", b:2329, c:true) {
        a
        b
        c
    }
}
```

</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "f1": {
      "a": "Hello, @tan",
      "b": 2329,
      "c": true
    }
  }
}
```
</div>

</div>


### OpenWhisk Serverless Functions
### How to setup and use a serverless?
* Create Serverless
* Define @tan directive
* Trigger Function

## Create Serverless

Navigate to Hypi's app release dashboard, and scroll down to the serverless functions list view.

<img className="img-responsive" src="/content/assets/img/serverless-section.jpg" alt="serverless section"/>

Click on the `Create` button and the serverless modal shall popup.

<img className="img-responsive" src="/content/assets/img/serverless-modal.jpg" alt="serverless section"/>

Choose `OpenWhisk` and fill the form. `OpenWhisk` supports two kinds of serverless functions; `sequence` and  many coding
programming languages. As the time of publishing this documentation, these are the supported `kind` values:

<div className={"code-container"}>

<div className={"code-column"}>

**kind**

```json
"sequence"
"dotnet:2.2"
"go:1.11"
"nodejs:10"
"ballerina:0.990"
"ruby:2.5"
"dotnet:3.1"
"swift:5.1"
"blackbox"
"swift:4.2"
"rust:1.34"
"java:8"
"nodejs:12"
"python:3"
"go:1.15"
"python:2"
"php:7.4"
"nodejs:14"
"php:7.3"
"swift:5.3"
```

</div>
</div>

For the latest supported programming runtimes, checkout the official `OpenWhisk` documentation
<a href="http://openwhisk.apache.org/documentation.html#actions-creating-and-invoking" target="_blank">Docs</a>.

If you choose `kind` to be `sequence`, then you can supply `components` as a comma separated string, for example,
`/whisk.system/utils/split,/whisk.system/utils/sort`

If you choose `kind` to be any programming runtime, for example, `nodejs:14`, then provide the `code` string, for example,
`function main(params) { return {body:{"a":"a","b":123,"c":true}}}`.

## Define @tan directive

Then, navigate to release schema under release dashboard and define the tan function and observe here how you can choose
the return type to be `Json` and you can provide the `saveAs` parameter to persist the response in Hypi's data layer as any custom type.


<div className={"code-container"}>

<div className={"code-column"}>

**@tan**

```graphql
type Query {
  owskf1(a: String, b: Int, c: Boolean):Json @tan(type:OpenWhisk, name:"owskf1")
  owskf2(a: String, b: Int, c: Boolean):Json @tan(type:OpenWhisk, name:"owskf2", saveAs: "OWSKRepeaterType")
}

type OWSKRepeaterType {
  activationId: String
  duration: Int
  response: OWSKCustomResult
}

type OWSKCustomResult {
  result: OWSKCustomBody
  status: String
  success: Boolean
}

type OWSKCustomBody {
  a: String
  b: Int
  c: Boolean
}
```
</div>
</div>

## Trigger Function

Now invoke the function and obtain the results;


<div className={"code-container"}>

<div className={"code-column"}>

**@tan**

```graphql
{
  owskf1(a: "a", b: 123, c: true)
}
```
</div>
<div className={"code-column"}>

**@tan**

```json
{
  "activationId": "8629ec7d38c84feca9ec7d38c87fecaf",
  "duration": 3,
  "response": {
    "result": {
      "a": "a",
      "b": 123,
      "c": true
    },
    "status": "success",
    "success": true
  }
}
```
</div>
</div>
