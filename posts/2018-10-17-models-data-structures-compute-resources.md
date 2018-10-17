---
ID: 530
post_title: 'Models, Data Structures &#038; Compute Resources'
author: zcourts
post_excerpt: >
  Hypi is built around apps and their data
  models. There are some default ones and
  you can provide your own. This section
  explains what they are and how you
  define and use them.
layout: post
permalink: >
  https://beta.hypi.io/docs/technical-docs/models-data-structures-compute-resources/
published: true
post_date: 2018-10-17 09:05:41
---
<!-- wp:heading {"level":1} -->

# Hypi data modelling {#hypi-data-modelling}

<!-- /wp:heading -->

<!-- wp:paragraph -->

Hypi models are defined using <a href="https://graphql.org/" target="_blank" rel="noreferrer noopener">GraphQL</a>. For detailed documentation on what GraphQL is, consult the <a href="https://graphql.org/learn" target="_blank" rel="noreferrer noopener">GraphQL documentation</a>. In summary, it is a data definition and query language. It defines a type system used for modelling a domain and functions for working with the models in that domain.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Introduction to GraphQL {#introduction-to-graphql}

<!-- /wp:heading -->

<!-- wp:paragraph -->

For the purposes of Hypi, we will discuss only the GraphQL features supported. GraphQL operations fall under three broad categories **queries**, **mutations** and **subscriptions**. Its type system consists of **scalars** and **composites. **Composites are further broken down into output and input types.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## GraphQL by example {#graphql-by-example}

<!-- /wp:heading -->

<!-- wp:paragraph -->

It can be useful to have a practical example to work with, let's imagine we're developing a simple inventory app. We will define the basic models that may be used and use them to demonstrate how it fits in with Hypi.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

As a developer of the inventory app you could create a simple model such along these lines:

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">type Inventory {<br />    name: String!<br />    items: [Item!]!<br />}<br />
<br />type Item {<br />    name: String!<br />    sku: String<br />    description: String @field(indexed: true)<br />    price: Float!<br />}</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

A non-standard GraphQL thing appear in this model. The `@field` takes an `indexed` argument, if set to true, the field will become searchable i.e. you will be able to find records by searching the contents of this field. Any number of fields can be indexed. The exact mechanism by which you can search is discussed later.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Hypi will generate several things from this model. By default, Hypi does not generate a Relay pagination API but you can use the @withrelay directive on a type to have it generate a <a href="https://facebook.github.io/relay/" target="_blank" rel="noreferrer noopener">relay</a> and <a href="https://www.apollographql.com/docs/react/features/pagination.html#relay-cursors" target="_blank" rel="noreferrer noopener">apollo</a> <a href="http://facebook.github.io/relay/graphql/connections.htm" target="_blank" rel="noreferrer noopener">compatible</a> version of your model. From the this model, the following are generated:

<!-- /wp:paragraph -->

<!-- wp:preformatted -->

<pre class="wp-block-preformatted">type Inventory {<br />    name: String!<br />    id: IDPK<br />    hypi: Hypi<br />    items(first: Int after: String): ItemConnection<br />}<br />
<br />type IDPK {<br />    value: ID<br />    publisherRealm: String<br />    instanceRealm: String<br />    version: String<br />}<br />
<br />type ItemConnection {<br />    pageInfo: PageInfo!<br />    edges: [ItemEdge]<br />}<br />
<br />type ItemEdge {<br />    node: Item<br />    cursor: String<br />}<br />#this type is not generated, it is provided by Hypi but included here for completeness<br />type PageInfo {<br />    hasNextPage: Boolean!<br />    hasPreviousPage: Boolean!<br />}<br />
<br />type InventoryInput {<br />    id: ID<br />    name: String!<br />    items: [ItemInput!]!<br />}<br />
<br />type ItemInput {<br />    id: ID<br />    name: String!<br />    sku: String<br />    description: String<br />    price: Float!<br />}<br />
<br />type InventoryInputOpt {<br />    id: ID<br />    name: String<br />    items: [ItemInputOpt]<br />}<br />
<br />type ItemInputOpt {<br />    id: ID<br />    name: String<br />    sku: String<br />    description: String<br />    price: Float<br />}<br />
<br />Query {<br />    getInventory(id: ID!): Inventory<br />    getSomeInventory(ids: [ID!]!): [Inventory!]!<br />    findInventory(filter: String first: Int after: String): InventoryConnection!<br />}<br />
<br />Mutation {<br />    trashInventory (ids: [ID]): Boolean<br />    deleteInventory(ids: [ID]): Boolean<br />    createInventory(value: InventoryInput): Inventory<br />    updateInventory(value: InventoryInputOpt): Inventory<br />}</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

By going through this generated version of the inventory model, it should be clear as to what Hypi is doing.

<!-- /wp:paragraph -->