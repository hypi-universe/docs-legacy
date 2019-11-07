---
title: "GraphQL Introduction"
metaTitle: "Hypi tutorial introducing GraphQL"
metaDescription: "Introduction to GraphQL on the Hypi platform"
---

## Introduction
GraphQL is **a syntax that represents how to request data** and is generally used to load data from a server to a client.  There are three main features of GQL:

1. Client specifies precisely the data it needs.                              
2. Aggregate data from multiple sources.
3. GQL uses a type system to describe data.
  
**GraphQL** is now considered one of the most modern ways of building and querying APIs. 


## So, what is GraphQL
GraphQL is an open-source server-side library created by Facebook to enhance RESTful API calls. The GraphQL data query language is:

* **A Specification**, that determines the validity of the schema on the API server. The schema defines the validity of client calls.

* **Strongly typed**, all GraphQL query corresponds to a particular type, and each type describes an available set of fields.  Furthermore,  GraphQL provides descriptive error messages before performing a query.

* **Introspective**, allowing a client can ask the server for details about the schema.

* **Hierarchical**, the shape of a GraphQL query mirrors the shape of the `JSON` data it returns. Query and receive only the data you specify in a single round trip.

> The purpose of GraphQL is to decrease the load on the server. **Users can make a single call to fetch the required data rather than to construct multiple REST requests.** The key idea is to `POST` a **"query"** to an HTTP endpoint, instead of hitting different HTTP endpoints for various resources. It makes fetching clients data from their backend APIs convenient.

**GraphQL**, makes getting server information much more comfortable and a lot faster.
A GraphQL "query" gets parsed to a string which is sent to a server to be interpreted and fulfilled, which returns JSON to the client.

<div className={"d-flex"}>

<div>

     {
       Movie {
         name
         # Queries can have comments!
         name
         year
       }
     }
     
</div>  
<div>

    {
           "data": {
             "movie": [
               {
                  "name": "R2-D2",
                  "year":"2019",
               },
               {
                  "name": "justice league",
                  "year": "2017"
               }
               ]
             }
           
     }
         
</div>

</div>


Noticed that **GraphQL queries mirror their response**, making it easy to predict the shape of the data returned from a query; as well as writing a query if you know the data your app needs.


GraphQL is unapologetic, and is driven by the data requirements of products and of the those who build them. Because of the predictability of GraphQL, it's easy to learn and use.

 > GraphQL is not a database query language or a storage model. The graph refers to graph structures specified in the schema, where nodes represent objects and edges represent connections linking objects. GraphQL APIs traverses and returns application data based on the schema definitions, independent of how the data is stored


## Why GraphQL
  Hypi chose GraphQL becasue it offers significantly more fexibility than rest. Giving us the  ability define precisely the data you need—and only the data you need— a powerful advantage over the REST APIs.

## GraphQL on Hypi

## Hypi GraphQL Scalars

