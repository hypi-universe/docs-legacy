---
title: "Interfaces"
metaTitle: "Hypi tutorial introducing GraphQL Interfaces"
metaDescription: "Introduction to GraphQL interfaces on the Hypi platform"
---


## Introduction
Similar to other type system, GraphQL supports interfaces. Interfaces are abstract types that holds a certain set of fields that a type must include to implement the interface.

Interfaces are powerful, and a great way to build and use GraphQL schemas through the use of abstract types. Abstract types can't be used directly in schema, but can be used as building blocks for creating explicit types.

Example, you could have an interface Car that represents any Car in a trade show:

    interface Car {
      id: ID!
      name: String!
      model: String
    }

This means that any type that implements Car needs to have these exact fields, with these arguments and return types.

For example, here are some types of brands that might implement Car:

    type Audi implements Car {
      id: ID!
      name: String!
      model: string
    }
    
    type Bentley  implements Car {
      id: ID!
      name: String!
      model: string
    }
<br/>
<br/>

TODO

Especially talk about providing `hypi.impl` field when performing mutations.
