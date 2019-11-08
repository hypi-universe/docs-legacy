---
title: "Introduction"
metaTitle: "Hypi tutorial introducing GraphQL"
metaDescription: "Introduction to GraphQL on the Hypi platform"
---

## So, what is GraphQL
GraphQL is an open-source server-side library created by Facebook to enhance RESTful API calls. The 

**GraphQL**, makes getting server information much more comfortable and a lot faster.
A GraphQL "query" gets parsed to a string which is sent to a server to be interpreted and fulfilled, which returns JSON to the client.

<div className={"d-flex"}>

<div className={"m-1"}>

     {
       Movie {
         name
         # Queries can have comments!
         name
         year
       }
     }
     
</div>  
<div className={"m-1"}>

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
