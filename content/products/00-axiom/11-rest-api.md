---
title: "RESTful APIs"
metaTitle: "Hypi RESTful APIs Developer Guide"
metaDescription: "Hypi Platform RESTful APIs Authentication, CRUD Operations, and GraphQL Operations Documentation"
---

## Overview

Hypi platform provides APIs with multiple flavors that suit different developers tastes. The RESTful APIs are no different and at the same time they were redesigned to abide by the HATEOS code of conduct for better semantics and easier interpretation.

The examples use the following GraphQL schema as an example.

```graphql
type URL  @indices(sets: [
  ["path"]
]){
  path: String!
  queryParams: Json
  port: Int
  host: String
}
```

> There could be multiple ways to perform the same functionality allowing Hypi developers to take advantage of flexibility and tuning the APIs to their awesome applications.

## Authentication
Users can login either by username or email and logins can be triggered either by `GET` or `POST`.

### GET
#### Username
The first is the login using the username method.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request GET 'http://localhost:10000/rest/v1/fn/query/login?username=x&password=y&type=query' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "login": {
      "hypi": null,
      "sessionToken": "eyJhb ...",
      "sessionExpires": 1598888479,
      "errorCode": null,
      "errorMsg": null
    }
  }
}
```

</div>

</div>

#### Email
The second is the login using the email method.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request GET 'http://localhost:10000/rest/v1/fn/query/loginByEmail?email=x&password=y&type=query' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "loginByEmail": {
      "hypi": null,
      "sessionToken": "eyJhb ...",
      "sessionExpires": 1598888597,
      "errorCode": null,
      "errorMsg": null
    }
  }
}
```
</div>
</div>

### POST
Authentication can also be performed using POST method.

#### Username
The first is the login using the username method.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request POST 'http://localhost:10000/rest/v1/login' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "username": "x",
      "password": "y"
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "login": {
      "hypi": null,
      "sessionToken": "eyJhb ...",
      "sessionExpires": 1598888836,
      "errorCode": null,
      "errorMsg": null
    }
  }
}
```
</div>
</div>

#### Email
The second is the login using the email method.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request POST 'http://localhost:10000/rest/v1/login' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "email": "x",
      "password": "y"
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "loginByEmail": {
      "hypi": null,
      "sessionToken": "eyJhb ...",
      "sessionExpires": 1598888914,
      "errorCode": null,
      "errorMsg": null
    }
  }
}
```
</div>
</div>

## CRUD Operations

The four basic CRUD operations **C**reate, **R**ead, **U**pdate, and **D**elete can be performed using the semantics of **P**ost, **G**et, **P**ut, and **D**elete HTTP methods. Furthermore, the APIs endpoints can be mapped to resources using the /{{aggregate}} or /{{aggregate}}/{{identifier}} for both GET and DELETE whilst POST and PUT will capture the identifiers from the GraphQL request body to avoid redundancy. Hereby, the RESTful APIs explained herein allow the same functionality as the CRUD operations manifested under [Hypi Platform CRUD Documentation](/products/axiom/crud)

### POST
In order to create a resource, send a POST request to the `/rest/v1` endpoint with the body containing the resource signature as defined by the GraphQL types.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request POST 'http://localhost:10000/rest/v1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "values": {
          "URL": {
              "host": "hypi.app",
              "path": "/",
              "hypi": {
                  "id": "url1"
              }
          }
      }
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "upsert": [
      {
        "created": null,
        "updated": "2020-08-01T17:52:05Z",
        "trashed": null,
        "id": "url1",
        "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
        "impl": null,
        "app": "store",
        "release": "latest",
        "instance": "hypi",
        "publisherRealm": "hypi",
        "publisherApp": "core",
        "publisherRelease": "latest",
        "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
      }
    ]
  }
}
```
</div>
</div>

### PUT
In order to make an update request, the same endpoint and the payload can be used, however, the HTTP method should be `PUT`.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request PUT 'http://localhost:10000/rest/v1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "values": {
          "URL": {
              "host": "hypi.app",
              "path": "/",
              "hypi": {
                  "id": "url1"
              }
          }
      }
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "upsert": [
      {
        "created": null,
        "updated": "2020-08-01T17:52:54Z",
        "trashed": null,
        "id": "url1",
        "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
        "impl": null,
        "app": "store",
        "release": "latest",
        "instance": "hypi",
        "publisherRealm": "hypi",
        "publisherApp": "core",
        "publisherRelease": "latest",
        "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
      }
    ]
  }
}
```
</div>
</div>

### GET by ID

In order to access a resource, replace `URL/url1` with {{aggregate}}/{{identifier}} where {{aggregate}} is the GraphQL type name from your app's schema and {{identifier}} is the ID of the object to get. Unlike the `GET` function, this returns a list of objects matching the filter provided.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request GET 'http://localhost:10000/rest/v1/URL/url1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "find": {
      "edges": [
        {
          "cursor": "url1",
          "node": {
            "hypi": {
              "created": "2020-08-01T05:51:55Z",
              "updated": "2020-08-01T05:52:54Z",
              "trashed": null,
              "id": "url1",
              "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
              "impl": null,
              "app": "store",
              "release": "latest",
              "instance": "hypi",
              "publisherRealm": "hypi",
              "publisherApp": "core",
              "publisherRelease": "latest",
              "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
            },
            "path": "/",
            "queryParams": null,
            "port": null,
            "host": "hypi.app"
          }
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false,
        "startCursor": "FIRST",
        "endCursor": "LAST",
        "pageLimit": 25,
        "previousOffsets": [],
        "nextOffsets": []
      }
    }
  }
}
```
</div>
</div>

## GET by ArcQL
GraphQL find method can be used to access a resource, so replace `URL` with {{aggregate}}.
> Any valid ArcQL supported
>
> The ArcQL parameter accepts any valid filter supported by [ArcQL](/reference/arcql). The example here uses `hypi.id = 'url1'` only for simplicity.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request GET "http://localhost:10000/rest/v1/URL?first=2&arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "find": {
      "edges": [
        {
          "cursor": "url1",
          "node": {
            "hypi": {
              "created": "2020-08-01T05:51:55Z",
              "updated": "2020-08-01T05:52:54Z",
              "trashed": null,
              "id": "url1",
              "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
              "impl": null,
              "app": "store",
              "release": "latest",
              "instance": "hypi",
              "publisherRealm": "hypi",
              "publisherApp": "core",
              "publisherRelease": "latest",
              "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
            },
            "path": "/",
            "queryParams": null,
            "port": null,
            "host": "hypi.app"
          }
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false,
        "startCursor": "FIRST",
        "endCursor": "LAST",
        "pageLimit": 2,
        "previousOffsets": [],
        "nextOffsets": []
      }
    }
  }
}
```
</div>
</div>

## DELETE by ID
In order to delete a resource, replace `URL/url1` with {{aggregate}}/{{identifier}}
<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request DELETE 'http://localhost:10000/rest/v1/URL/url1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "delete": 1
  }
}
```
</div>
</div>

## DELETE by ArcQL
The same can be achieved using GraphQL by passing the identifier as a query parameter `?id=xx` and replace `URL` with {{aggregate}}
<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request DELETE "http://localhost:10000/rest/v1/URL?arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "delete": 1
  }
}
```
</div>
</div>

# GraphQL/ArcQL Functions
Any arbitrary GraphQL function can be triggered using the following endpoint.
- Endpoints: /rest/v1/fn/{root}/{fn}
- Replace {root} with either of `query` or `mutation`
- Replace {fn} with ArcQL functions such as get, find, login, or your own GraphQL function that you defined in your app's schema.

## POST
`POST` can be used to create resources on the server. This is equivalent to calling the Hypi `upsert` function in GraphQL.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request POST 'http://localhost:10000/rest/v1/fn/mutation/upsert' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "values": {
          "URL": {
              "host": "hypi.app",
              "path": "/",
              "hypi": {
                  "id": "url1"
              }
          }
      }
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "upsert": [
      {
        "created": "2020-08-01T18:03:07Z",
        "updated": "2020-08-01T18:03:07Z",
        "trashed": null,
        "id": "url1",
        "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
        "impl": null,
        "app": "store",
        "release": "latest",
        "instance": "hypi",
        "publisherRealm": "hypi",
        "publisherApp": "core",
        "publisherRelease": "latest",
        "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
      }
    ]
  }
}
```
</div>
</div>

## PUT
Similar to `POST`, `PUT` is used to update/modify existing resources.
<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request PUT 'http://localhost:10000/rest/v1/fn/mutation/upsert' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json' \
  --data-raw '{
      "values": {
          "URL": {
              "host": "hypi.app",
              "path": "/",
              "hypi": {
                  "id": "url1"
              }
          }
      }
  }'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "upsert": [
      {
        "created": null,
        "updated": "2020-08-01T18:04:00Z",
        "trashed": null,
        "id": "url1",
        "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
        "impl": null,
        "app": "store",
        "release": "latest",
        "instance": "hypi",
        "publisherRealm": "hypi",
        "publisherApp": "core",
        "publisherRelease": "latest",
        "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
      }
    ]
  }
}
```
</div>
</div>

### GET
For further flexibility the **R**ead requests discussed above can be rephrased as arbitrary GraphQL functions by using `query/get` or `query/fin`.

#### Find
The `GET`, `PUT`, `POST` and `DELETE` methods above are all semantics to make the API more familiar and inline with existing common practice but the same thing can be done by explicitly calling the appropriate function by passing the `aggregate` to `type` query parameter when using `find` GraphQL function.

<div className={"code-container"}>

<div className={"code-column"}>

**Request**

```bash
$ curl --location --request GET "http://localhost:10000/rest/v1/fn/query/find?first=1&type=URL&arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```
</div>
<div className={"code-column"}>

**Response**

```json
{
  "data": {
    "find": {
      "edges": [
        {
          "cursor": "url1",
          "node": {
            "hypi": {
              "created": "2020-08-01T06:03:07Z",
              "updated": "2020-08-01T06:04:00Z",
              "trashed": null,
              "id": "url1",
              "createdBy": "01E8TR0ZVWJC7JTK0Z04TVZ7HT",
              "impl": null,
              "app": "store",
              "release": "latest",
              "instance": "hypi",
              "publisherRealm": "hypi",
              "publisherApp": "core",
              "publisherRelease": "latest",
              "instanceId": "01E8TQXPF01QR7QYFZA038DM2P"
            },
            "path": "/",
            "queryParams": null,
            "port": null,
            "host": "hypi.app"
          }
        }
      ],
      "pageInfo": {
        "hasPreviousPage": false,
        "hasNextPage": false,
        "startCursor": "FIRST",
        "endCursor": "LAST",
        "pageLimit": 1,
        "previousOffsets": [],
        "nextOffsets": []
      }
    }
  }
}
```
</div>
</div>