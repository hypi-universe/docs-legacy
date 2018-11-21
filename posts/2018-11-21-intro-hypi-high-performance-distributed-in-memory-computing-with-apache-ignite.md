---
ID: 681
post_title: >
  Intro Hypi High Performance Distributed
  In Memory Computing with Apache Ignite
author: zcourts
post_excerpt: "In this post Hypi's founder and CTO presents about Hypi's storage architecture at the London In Memory Computing meetup. A must read for anyone interested in the cogs turning behind the scenes!"
layout: post
permalink: >
  https://hypi.io/blog/platform/technical-blog/intro-hypi-high-performance-distributed-in-memory-computing-with-apache-ignite/
published: true
post_date: 2018-11-21 21:39:58
---
<!-- wp:paragraph -->

This is part 1 in the series on how Hypi's implemented.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

One of the core features of the Hypi platform is that it allows a publisher to instantly go from a GraphQL model to a scalable, production ready GraphQL API.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Imagine you wanted to build an app like Facebook, an over simplified data model to start with may look like this.

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"extend type User{\n  followers: [User!]\n}\n\ntype Post {\n  createdBy: User!\n  text: String!\n  attachments: [Attachment!]\n  likes: [Like!]\n  comments: [Comment!]\n}\n\ntype Like {\n  likedBy: User!\n}\n\ninterface Attachment {\n  comments: [Comment!]\n}\n\ntype Image implements Attachment {\n  url: URL\n  width: Int\n  height: Int\n}\n\ntype Video implements Attachment {\n  thumbnails: [Image!]!\n  url: URL\n}\n\ntype Comment {\n  user: User!\n  text: String!\n}","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eextend\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eUser\u003c/span\u003e{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003efollowers\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eUser\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ecreatedBy\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eUser\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003etext\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003eattachments\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eAttachment\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003elikes\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eLike\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ecomments\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eComment\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eLike\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003elikedBy\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eUser\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003einterface\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eAttachment\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ecomments\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eComment\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eImage\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003eimplements\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eAttachment\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003eurl\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eURL\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ewidth\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eInt\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003eheight\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eInt\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eVideo\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable\u0022\u003eimplements\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eAttachment\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ethumbnails\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003eImage\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003eurl\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eURL\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eComment\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003euser\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003eUser\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003etext\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Hypi will generate a CRUD API e.g. from this model some GraphQL functions that become available would include:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"findPost(filter: String): [Post]!\ncreatePost(values: [Post!]!): [Post!]!\nupdatePost(values: [Post!]!): [Post!]!\ntrashPost(filter: String!): [Post!]!\ndeletePost(filter: String!): [Post!]!","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003efindPost\u003c/span\u003e(\u003cspan class=\u0022kbco-builtin\u0022\u003efilter\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ecreatePost\u003c/span\u003e(\u003cspan class=\u0022kbco-variable\u0022\u003evalues\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eupdatePost\u003c/span\u003e(\u003cspan class=\u0022kbco-variable\u0022\u003evalues\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003etrashPost\u003c/span\u003e(\u003cspan class=\u0022kbco-builtin\u0022\u003efilter\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003edeletePost\u003c/span\u003e(\u003cspan class=\u0022kbco-builtin\u0022\u003efilter\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Hypi focuses on the relationships in the schema and depends heavily on them to understand what it should generate for you app's API. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

At the [Nov 2018, London In Memory Computing meetup][1] we spoke about how Hypi implements these under the hood.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

In particular, we introduced two original optimisation techniques created as part of our CTO's PhD research (Wormhole traversals and Vertex cascading) and about how these two techniques when used in combination with a custom [FMIndex][2] (emphasising the importance of [Burrows Wheel Transform][3]).

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The talk covered business to theory to ignite approach, much like what's shown in the following

<!-- /wp:paragraph -->

<!-- wp:image {"id":684,"width":1024,"height":561} --><figure class="wp-block-image is-resized">

<img src="https://hypi.io/wp-content/uploads/2018/11/Screen-Shot-2018-11-21-at-15.46.01-1024x561.png" alt="" class="wp-image-684" width="1024" height="561" /></figure> <!-- /wp:image -->

<!-- wp:paragraph -->

In this series, we will be writing a post which covers each of these in turn.

<!-- /wp:paragraph -->

<!-- wp:list -->

*   [GraphQL][4]
*   Graphs (a little [Graph Theory][5])
*   Categories (A touch of [Category Theory][6])
*   Wormhole Traversals (an original technique developed at Hypi, publication soon)
*   Cascading Vertices (another original publication to come)
*   [FM Index][2] (A [succinct data structure][7] used internally in Hypi)
*   [Apache Ignite][8] and how Hypi integrates the concepts above with it.

<!-- /wp:list -->

<!-- wp:paragraph -->

This post doesn't go into details but we hope it at least gets you prepared for the rest of this posts to come in this series. The posts to come will be detailed and will explain how these techniques and technologies work together.

<!-- /wp:paragraph -->

<!-- wp:gallery {"ids":[686,688,691,693,695,696,698,699,700,701,702,703,704,705]} -->

<ul class="wp-block-gallery columns-3 is-cropped">
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183903-min-768x1024.jpg" alt="" data-id="686" data-link="https://hypi.io/?attachment_id=686" class="wp-image-686" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_181444-min-768x1024.jpg" alt="" data-id="688" data-link="https://hypi.io/?attachment_id=688" class="wp-image-688" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_184032-min-1024x768.jpg" alt="" data-id="691" data-link="https://hypi.io/?attachment_id=691" class="wp-image-691" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_184022-min-1024x768.jpg" alt="" data-id="693" data-link="https://hypi.io/?attachment_id=693" class="wp-image-693" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183737-min-1024x768.jpg" alt="" data-id="695" data-link="https://hypi.io/?attachment_id=695" class="wp-image-695" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183843-min-768x1024.jpg" alt="" data-id="696" data-link="https://hypi.io/?attachment_id=696" class="wp-image-696" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183806-min-768x1024.jpg" alt="" data-id="698" data-link="https://hypi.io/?attachment_id=698" class="wp-image-698" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183851-min-768x1024.jpg" alt="" data-id="699" data-link="https://hypi.io/?attachment_id=699" class="wp-image-699" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183842-min-768x1024.jpg" alt="" data-id="700" data-link="https://hypi.io/?attachment_id=700" class="wp-image-700" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183049-min-768x1024.jpg" alt="" data-id="701" data-link="https://hypi.io/?attachment_id=701" class="wp-image-701" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183051-min-768x1024.jpg" alt="" data-id="702" data-link="https://hypi.io/?attachment_id=702" class="wp-image-702" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_182255-min-768x1024.jpg" alt="" data-id="703" data-link="https://hypi.io/?attachment_id=703" class="wp-image-703" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_182258-min-768x1024.jpg" alt="" data-id="704" data-link="https://hypi.io/?attachment_id=704" class="wp-image-704" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://hypi.io/wp-content/uploads/2018/11/IMG_20181120_183726-min-1024x768.jpg" alt="" data-id="705" data-link="https://hypi.io/?attachment_id=705" class="wp-image-705" /></figure>
  </li>
</ul>

<!-- /wp:gallery -->

 [1]: https://www.meetup.com/London-In-Memory-Computing-Meetup/events/256078248/
 [2]: https://en.wikipedia.org/wiki/FM-index
 [3]: https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform
 [4]: https://graphql.org/
 [5]: https://en.wikipedia.org/wiki/Graph_theory
 [6]: https://en.wikipedia.org/wiki/Category_theory
 [7]: https://en.wikipedia.org/wiki/Succinct_data_structure
 [8]: http://ignite.apache.org