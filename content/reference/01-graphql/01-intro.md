---
title: "Introduction"
metaTitle: "Hypi tutorial introducing GraphQL"
metaDescription: "Introduction to GraphQL on the Hypi platform"
---

## So, what is GraphQL
GraphQL is an open-source server-side library created by Facebook to enhance RESTful API calls. The 

**GraphQL**, makes getting server information much more comfortable and a lot faster.
A GraphQL `query` gets parsed to a string which is sent to a server to be interpreted and fulfilled, which returns JSON to the client.

<div className={"code-container"}>

<div className={"code-column"}>

     {
       Songs {
         name
         # Queries can have comments!
         author
         year
       }
     }
     
</div>  
<div className={"code-column"}>

    {
           "data": {
             "songs": [
               {
                  "name": "It's A Beautiful Day",
                  "author": "Queen",
                  "year":"1995",
               },
               {
                  "name": "Let's Make A Night To Remember",
                  "author": "Bryan Adams",
                  "year": "1996"
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
  Hypi chose GraphQL because it offers significantly more flexibility than rest. Giving us the ability to define precisely the data you need—and only the data you need— a powerful advantage over the REST APIs.

### Why adopting GraphQL and Hypi will help you ship apps faster

Modern applications and managing data can present many challenges. Developers are aggregating data from multiple sources, scatter upon numerous platforms, and fathom it into an app's UI. Furthermore, developers are deciding how to manage state on the client, simultaneously executing complex features such as caching and optimistic UI.

Adopting Hypi in your organisation will ease these pain points considerably. Using GraphQL's declarative approach to data fetching will simplify data transformation and speed up your API and app development. Using the Hypi platform enables faster development cycles thanks to its advanced ecosystem of tooling and excellent developer experience.


### Explore your API
Hypi loves GraphQL's strongly typed query language because it enables developers to take advantage of incredible tooling for exploring App Instance  APIs. Developers can query a Release schema for information about what queries and types it supports. Introspection at our fingertips; automatic documentation, autocomplete, and more.
