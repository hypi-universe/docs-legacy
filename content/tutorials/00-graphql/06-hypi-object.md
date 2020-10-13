---
title: "Magic Hypi Object"
metaTitle: "Hypi tutorial about the magic Hypi object"
metaDescription: "Documentation of the magic hypi field injected into all Hypi schema objects."
---

## Overview

We like when things are simple and as automated as possible, especially in programming. Another way Hypi helps to do this is with the `Magic Hypi object`. **This object gets attached to every type automatically.** Thus, why we are calling it 'magic' – because its never directly created, and it allows the programmer to do some pretty powerful things. An example will help make this clear.

**Let's say you have a type:**

    type Item {
         slug: String! @field(indexed: true, type: Keyword)
         title: String! @field(indexed: true)
         description: String @field(indexed: true)
         comments: [Comment!]
    }

If you run the `findItem` "operation" , you will notice the Magic Hypi object is attached, and you will also see it in your API's doc. So, every defined type in your schema will have the Magic Hypi Object auto attached to it for your convenience.

    type Item {
         slug: String! @field(indexed: true, type: Keyword)
         title: String! @field(indexed: true)
         description: String @field(indexed: true)
         comments: [Comment!]
         hypi:Hypi // Hypi magic object
    }


![Magic Object](content/assets/img/hypi-magic-object.jpg "Magic Object")

**Note: ** The Hypi magic object is always attached as a field of another type, and is not a stand-alone object for you to create records of. Read on to see the available fields on the magical object.

## Available fields
Here's a list of fields made available on the `Hypi Object` with there corresponding type.

### id
`id: String`.
Uniquely identifies an object of a given type. If not specified in a mutation then Hypi automatically generates a unique ID. It is *required* during an update mutation to identify the object being updated. It can be specified in an [ArcQL](/reference/02-arcql) query to find objects by ID.
### trashed
`trashed: DateTime`.
The date on which the objected was marked as trashed.
### updated
`updated: DateTime`.
The last date the object was updated
### created
`created: DateTime`.
The date when the object was created.
### createdBy
`createdBy: String`.
The ID of the `Account` which created the object.
### impl
`impl: String`.
*hypi.impl* can be specified for any interface field in a mutation to tell Hypi which implementation of the [*interface*](/reference/01-graphql/07-interfaces) the data is for. Hypi supports GraphQL `interface` declarations. An interface can have one or more concrete implementations. When you perform a mutation containing interfaces Hypi cannot automatically decide which implementation of the interface you intend the data to be for.
### app
`app: String`.
The name of the app which created the object.
### instance
`instance: String`.
The name of the [*Realm*](/reference/realm) in which the object was created.
### release
`release: String`.
The version of the app which created this object
### publisherApp
`publisherApp: String`.
The name of the app which created the object, generally the same as `appp`
### publisherRealm
`publisherRealm: String`.
The name of the realm of the publisher which created the app which created the object. If the app is created an used in the same realm, this is the same as `instance`.
### publisherRelease
`publisherRelease: String`.
The release version of the app, generally the same as `release`.
### modelTypeName
`modelTypeName: String`.
The name of the GraphQL type that the object represents.
### pagingToken
`pagingToken: String`.
A string which can be passed in the `FROM` clause of an ArcQL query to identify the object from or to which to paginate.

## What fields can you override and when

Most fields on the Hypi object are automatically generated and cannot be provided.
Below are the ones which are exceptions to this.
### id
`id: String`.
The `id` field can be provided during mutations, queries and subscriptions.
If provided during a create, Hypi will use the ID you provide to identify the object being created.
`id` is required during an update to identify the object which needs to be updated.
When querying, to find an object by its id, use `hypi.id = '<my-objects-id>'`.
### impl
`impl: String`.
When performing mutations, the `hypi.impl` field is required for any field whose type is an interface. The mutation will fail if all interface fields do not specify this field.
