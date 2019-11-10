---
title: "Queries"
metaTitle: "Hypi tutorial introducing GraphQL."
metaDescription: "Introduction to GraphQL on the Hypi platform."
---
## Introduction
Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.
  
GraphQL queries return only the data you define. To construct a query, you must identify fields within fields ( known as nested subfields) continuously, until you return only scalars.

## GraphQL API

The GraphQL API has a single endpoint: `https://api.hypi.app/graphql`                            
You should construct queries like this:

    query getMyTodos {
      todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
        id
        title
        created_at
        is_completed
      }
    }
    
## Authorization
Note: You need to pass the Authorization: Auth `token` header before querying to get the results. Example of setting up your header with auth token.


    {
      "url": "https://api.hypi.app/graphql/",
      "headers": {
         "Authorization":"Auth Token here. It can be copied from the Developer Hub",
         "hypi-domain": "my-domain.com"
      }
    },
    

## Query Variables

GraphQL Variables makes queries more dynamic and powerful, and they reduce complexity when passing mutation input objects.

    query($number_of_repos:Int!) {
      viewer {
        name
         repositories(last: $number_of_repos) {
           nodes {
             name
           }
         }
       }
    }
    variables {
       "number_of_repos": 3
    }


There are three steps to using variables:

1. Create the variable outside the operation in a `variables` object:
2.  The variable nneds to be pass to the operation as an argument:
 ` query($limit:Int!){ `  
3. Use the variable within the operation:
   `repositories(limit: $limit) {`

This process makes the query argument dynamic. You can  change the value in the `variables` object and keep the foundation of the query the same.

Using variables as arguments lets you dynamically update values in the variables object without changing the query.
