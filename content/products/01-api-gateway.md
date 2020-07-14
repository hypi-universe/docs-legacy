---
title: "API Gateway"
metaTitle: "Hypi Platform Documentation for Hypi API Gateway"
metaDescription: "Hypi platform documentation of the available HTTP API Gateway service"
---

# Overview
Hypi's API gateway can be throught of as a middleware that simplifies the integration of your app with other services.

Importantly, by using the Hypi gateway, you can integrate external services with your Hypi app as if they were a part of the platform.

Hypi's features such as authorisation, workflows etc can all be mixed with gateway functions.

# Using the API gateway
To use the API gateway, you must add a dependency to the `gateway` app.
As a reminder, a dependency is referenced by the app name, realm and release.
The API gateway app has the following dependency coordinates:

* realm: hypi
* name: gateway
* release: latest

You can change the release to another one available at the time.
To find the releases available, use the Hypi user interface or API to find the Gateway app and this will provide a full, current list of releases available.

# @http directive

Hypi's API gateway is centered around a directive, namely `@http`.
To integrate an API you add the directive to a query or mutation function in your app's schema.

Once you have added the directive to a function, it can be treated like any other function in Hypi. The only thing special about it is that instead of getting its data from the Hypi platform or serverless function, it will get its data from the HTTP service you've configured it to.

## Definition and parameters

```graphql
directive @http(
  method: HttpMethod! = GET,
  url: String!,
  headers: String,
  requestTemplate: String,
  saveAs: String
) on FIELD_DEFINITION
```

| Parameter | Description | Example |
|-|-|-|
| method | One of the available HTTP methods | GET, PUT, POST, DELETE, PATCH, OPTIONS, HEAD, TRACE |
| url | The URL template to use to make the request | https://api.my-domain.com/users/${settings.userId}?includeAge=${vars.includeAge} |
| headers | The string formatted JSON object which sets the headers sent in the HTTP request. A JSON object where ALL entries MUST be strings or convertible to strings (basically numbers) #e.g. {"a": "v1", "b": 2} | {"Authorization":"Bearer ${settings.apiToken}"} |
| requestTemplate | The name of the request template which defines how the request body and response should be handled |  |
| saveAs | If present, the HTTP response will be stored in Hypi as the given type. The type must exist in the current instance |  |


When applied causes the value of the field it is applied to to be resolved using an HTTP query configured with the given parameters

##  Variables
Each argument is a valid Velocity template meaning you can use dynamic parameters.
The following may be referenced "vars", "settings".

1. **vars** refers to any arguments on the field the directive is applied to so ${vars.firstName} refers to the firstName arg of the field
2. **settings** refers to any instance settings provided in the app

## Utilities:
JSON and Map utilities are available for use in all templates.

1. JsonNode JSON.parseJSON(String)
2. Map<String, Object> JSON.parse(String)

Map is the standard Java Map interface containing static util methods e.g. Map.of(...)
JsonNode is a class used to represent JSON values by the Jackson JSON library.

## Example
In the Hypi schema editor (or via the API), you annotate any query or mutation you define with this directive.

```graphql
type Query {
 getUser(includeAge: Boolean): User @http(
    url: "https://api.my-domain.com/users/${settings.userId}?includeAge=${vars.includeAge}",
    headers: """{"Authorization":"Bearer ${settings.apiToken}"}"""
  )
}
```

You can then call this function via HTTP or GraphQL in your app.
Note here that the response from the API *MUST* match the structure of the `User` object you specified as the return type.

If you're making a request to an API which doesn't directly match your type i.e. `User` in this case, you can use the `requestTemplate`
parameter to transform the API response by extracting fields from it and constructing an object which matches your declared return type.
