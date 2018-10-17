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
  https://beta.hypi.io/blog/solutions/models-data-structures-compute-resources/
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

<pre class="wp-block-preformatted">type Inventory {<br />    id: ID @pk<br />    name: String!<br />    items: [Item!]!<br />}<br />
<br />type Item {<br />    id: ID @pk<br />    name: String!<br />    sku: String<br />    description: String @field(indexed: true)<br />    price: Float!<br />}</pre>

<!-- /wp:preformatted -->

<!-- wp:paragraph -->

Two non-standard GraphQL things appear in this model. `@pk` and `@field`. `@pk` marks a field as the "primary key" for the type. Each type can have exactly one field marked as the primary key. This key is not limited to being a scalar however, it can be a composite object which has 2 or more scalar fields. `@field` takes an `indexed` argument, if set to true, the field will become searchable i.e. you will be able to find records by search the contents of this field. Any number of fields can be indexed. The exact mechanism by which you can search is discussed later.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Hypi will generate several things from this model. Firstly, by default, it will generate a <a href="https://facebook.github.io/relay/" target="_blank" rel="noreferrer noopener">relay</a> and <a href="https://www.apollographql.com/docs/react/features/pagination.html#relay-cursors" target="_blank" rel="noreferrer noopener">apollo</a> <a href="http://facebook.github.io/relay/graphql/connections.htm" target="_blank" rel="noreferrer noopener">compatible</a> version of your model. From the this model, the following are generated:

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

By going through this generated version of the inventory model, it should be clear as to what Hypi is doing. Here's a break down of the most important parts of the generated model.

<!-- /wp:paragraph -->

<!-- wp:table -->

<table class="wp-block-table">
  <tbody>
    <tr>
      <td>
        Definition
      </td>
      
      <td>
        Purpose/Comments
      </td>
    </tr>
    
    <tr>
      <td>
        Inventory.id
      </td>
      
      <td>
        In the original definition, this was an <code>ID</code> type, in the generated model it has become <code>IDPk</code> type. Every primary key gets "wrapped" like this. This is important because it enables automatic support for <a href="/dev/~/edit/drafts/-LP0FuLnbSksmgphIN0_/platform-guide/multi-tenancy">multi-tenancy</a> in your app.
      </td>
    </tr>
    
    <tr>
      <td>
        IDPK.value
      </td>
      
      <td>
        This holds the value of the primary key specified in the original model. Notice the type is <code>ID</code> as originally specified.
      </td>
    </tr>
    
    <tr>
      <td>
        IDPK.publisherRealm
      </td>
      
      <td>
        Hypi automatically populates this with the realm of the developer which <strong>publishes</strong> the app.
      </td>
    </tr>
    
    <tr>
      <td>
        IDPK.instanceRealm
      </td>
      
      <td>
        Hypi automatically populates this with the realm of the organisation which <strong>installs</strong> the app.
      </td>
    </tr>
    
    <tr>
      <td>
        IDPK.version
      </td>
      
      <td>
        This is the version of the app that is installed to the organisation's account.
      </td>
    </tr>
    
    <tr>
      <td>
        Inventory.items
      </td>
      
      <td>
        In the original definition, this was <code>[Item!]!</code> type, in the generated model it has become <code>ItemConnection</code> which takes <code>first</code> and <code>after</code> as arguments. ItemConnection is what has been generated to provide a relay and apollo compatible data model. This enables those frameworks to perform pagination without you having to do any extra work.
      </td>
    </tr>
    
    <tr>
      <td>
        Inventory.hypi
      </td>
      
      <td>
        Hypi reserves the field <code>hypi</code> and inserts a type of type <code>Hypi</code> which it will populate with fields it thinks is useful for you to have access to on each model.
      </td>
    </tr>
    
    <tr>
      <td>
        ItemConnection, ItemEdge
      </td>
      
      <td>
        Are generated according to the relay specifications and enables auto pagination for frameworks like relay and apollo when using react and angular to build your Hypi app.
      </td>
    </tr>
    
    <tr>
      <td>
        InventoryInput
      </td>
      
      <td>
        Content
      </td>
    </tr>
    
    <tr>
      <td>
        ItemInput
      </td>
      
      <td>
        Content
      </td>
    </tr>
    
    <tr>
      <td>
        InventoryInputOpt
      </td>
      
      <td>
        Content
      </td>
    </tr>
    
    <tr>
      <td>
        ItemInputOpt
      </td>
      
      <td>
      </td>
    </tr>
  </tbody>
</table>

<!-- /wp:table -->