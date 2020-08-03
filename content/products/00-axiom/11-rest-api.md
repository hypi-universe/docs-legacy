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

## Authentication
Users can login either by username or email and logins can be triggered either by Get or Post.
### GET
#### Username
The first is the login using the username method.

<div className={"code-container"}>

<div className={"code-column"}>
```
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
```
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
```
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
```
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

# CRUD Operations

## POST
```
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

**Response**
```
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

## PUT
```
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

**Response**
```
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

## GET by ID
Replace URL/url1 with {aggregate}/{id}
```
$ curl --location --request GET 'http://localhost:10000/rest/v1/URL/url1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
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

## GET by ArcQL
Replace URL with {aggregate}
```
$ curl --location --request GET "http://localhost:10000/rest/v1/URL?first=2&arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
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

## DELETE by ID
Replace URL/url1 with {aggregate}/{id}
```
$ curl --location --request DELETE 'http://localhost:10000/rest/v1/URL/url1' \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
{
  "data": {
    "delete": 1
  }
}
```

## DELETE by ArcQL
Replace URL with {aggregate}
```
$ curl --location --request DELETE "http://localhost:10000/rest/v1/URL?arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
{
  "data": {
    "delete": 1
  }
}
```

# GraphQL/ArcQL Functions
- Endpoints: /rest/v1/fn/{root}/{fn}
- Replace {root} with either of query or mutation
- Replace {fn} with ArcQL functions such as get, find, login, ... etc.
## POST
```
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

**Response**
```
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

## PUT
```
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

**Response**
```
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

## - GET

### -- ID
```
$ curl --location --request GET "http://localhost:10000/rest/v1/fn/query/get?type=URL&id=url1" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
{
  "data": {
    "get": {
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
}
```

### -- Find
```
$ curl --location --request GET "http://localhost:10000/rest/v1/fn/query/find?first=1&type=URL&arcql=hypi.id='url1'" \
  --header 'authorization: eyJhb ...' \
  --header 'hypi-domain: latest.store.hypi.hypi.hypi.app' \
  --header 'content-type: application/json'
```

**Response**
```
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
