---
ID: 719
post_title: 'IaM: Understanding what can be protected'
author: zcourts
post_excerpt: >
  In this post we dive into some of the
  details on how you can quickly add
  authorisation to your Hypi apps.
layout: post
permalink: >
  https://hypi.io/blog/solutions/iam-understanding-what-can-be-protected/
published: true
post_date: 2018-12-01 01:05:52
---
<!-- wp:paragraph -->

In a previous post [IaM post][1] we introduced IaM in Hypi. The post described that there are a few distinct categories of things that can be protected with the Hypi platform.

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  GraphQL functions on a per app basis, this protection is Type based
2.  Records created by these functions, this protection is Type:ID based
3.  Non-record assets e.g. images/files, this protection is HTTP URI based

<!-- /wp:list -->

<!-- wp:paragraph -->

In this post, we will explore the first of these and explain how to go about making use of this. When creating an App, you can create one or more models that Hypi will generate a GraphQL API for. For example:

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","lines":true,"content":"type Post {\n  title: String!\n  body: String!\n  slug: String!\n}","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \u003cdiv class=\u0022kbco-nums\u0022\u003e\u003cdiv class=\u0022kbco-num\u0022\u003e1\u003c/div\u003e\u003cdiv class=\u0022kbco-num\u0022\u003e2\u003c/div\u003e\u003cdiv class=\u0022kbco-num\u0022\u003e3\u003c/div\u003e\u003cdiv class=\u0022kbco-num\u0022\u003e4\u003c/div\u003e\u003cdiv class=\u0022kbco-num\u0022\u003e5\u003c/div\u003e\u003c/div\u003e\n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003etype\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u0026nbsp;{\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003etitle\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003ebody\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e  \u003cspan class=\u0022kbco-variable\u0022\u003eslug\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e}\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

In doing so Hypi will generate several GraphQL functions for you to use to work with `Post` types.

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"\u002d\u002d Query:\nfindPost(filter: String): [Post!]\n\n\u002d\u002d Mutation:\ncreatePost(..)\nupdatePost(..)\ntrashPost(..)\ndeletePost(..)","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-comment\u0022\u003e\u002d\u002d Query:\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003efindPost\u003c/span\u003e(\u003cspan class=\u0022kbco-builtin\u0022\u003efilter\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;\u003cspan class=\u0022kbco-builtin\u0022\u003eString\u003c/span\u003e)\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u0026nbsp;[\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003e!\u003c/span\u003e]\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-comment\u0022\u003e\u002d\u002d Mutation:\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ecreatePost\u003c/span\u003e(\u003cspan class=\u0022kbco-keyword\u0022\u003e..\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eupdatePost\u003c/span\u003e(\u003cspan class=\u0022kbco-keyword\u0022\u003e..\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003etrashPost\u003c/span\u003e(\u003cspan class=\u0022kbco-keyword\u0022\u003e..\u003c/span\u003e)\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003edeletePost\u003c/span\u003e(\u003cspan class=\u0022kbco-keyword\u0022\u003e..\u003c/span\u003e)\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

On its own, these operations are unprotected i.e. anyone with access to the generated API can call them. In most cases, that is not ideal. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Thankfully, Hypi makes protecting them very easy. In your app definition, simply add a dependency on the Hypi `hypi:iam:latest` App. If you're unfamiliar with the syntax, `hypi` is the publisher realm, `iam` is the name of the App and `latest`is the release name (or version) that you're adding a dependency to.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

How does this solve the authorisation problem?  
Hypi has support for scripting which takes on two forms

<!-- /wp:paragraph -->

<!-- wp:list -->

*   **Hypi Prime** - The Hypi Prime version enables the submissions of JavaScript or Java code that is executed locally to the data
*   **Hypi Gamma** - Full blown serverless functions that you can package into a Docker container, using any language or framework you want and Hypi will call out to it, passing the appropriate data

<!-- /wp:list -->

<!-- wp:paragraph -->

Authorisation is implemented with **Hypi Prime**. Being a core functionality, the platform has builtin support specifically for this.  
  
When the IaM app is added as a dependency of your app, it brings into scope a Hypi Prime function called `iam-auth.fn` which is a `Java_Function` defined by the IaM app as a pre-script. Functions in Hypi can be executed as pre or post scripts i.e. before or after any generated function, or in the case of custom GraphQL functions, any script can be called to be executed as the logic behind that GraphQL function.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

So that explains a little of how authorisation can be added very simply. Once it's added, what does it do, what is it authorising?

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Before we answer that, Hypi's authorisation is done with OAuth 2, behind the scenes when an operation is performed, various OAuth 2 actions are performed implicitly, in some cases it is explicit where it needs to be.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

A thorough treatment of OAuth 2 is outside the scope of this guide, an [introduction to OAuth can be found here][2], the relevant concepts are

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  **Resource Server** - Hosts the protected resources (The Hypi API is the resource server)
2.  **Authorisation Server** - Verifies the identity and checks if they can do what they're trying to.
3.  **Resource Owner** - Owns the protected resources (e.g. a `Post` record)
4.  **Client** - An agent trying to access the protected resource e.g. the browser or a mobile app 
5.  **Scope** - A "bounded context" which limits what can be accessed

<!-- /wp:list -->

<!-- wp:paragraph -->

Requests to the Hypi generated API uses the standard `Authorization` header to pass an access token. The script will take this token and ask the authorisation server if that token is allowed to execute the GraphQL function, if the server says yes, the script returns true and the GraphQL function is executed as if nothing had happened, if the server says no, the script raises an exception and returns immediately, nothing else is executed.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

How does the authorisation server know if the user the token belongs to is authorised or not?  
In the [introduction to IaM][1] post, **Scope based protection** is mentioned. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

What Hypi does is, it treats every GraphQL function (that includes fields outside of Query and Mutation objects) as a **Scope**. From the example above, If your Hypi realm is called `publisher` and the app is called `blog` the following scopes are created

<!-- /wp:paragraph -->

<!-- wp:kebo/code {"lang":"Haskell","content":"publisher:blog:Post:title\npublisher:blog:Post:content\npublisher:blog:Post:slug\n\npublisher:blog:Query:findPost\npublisher:blog:Mutation:createPost\npublisher:blog:Mutation:updatePost\npublisher:blog:Mutation:trashPost\npublisher:blog:Mutation:deletePost","highlighted":"\n                \u003cdiv class=\u0022kbco-block kbco-github\u0022\u003e\n                    \n                    \u003cdiv class=\u0022kbco-code\u0022\u003e\u003cdiv class=\u0022kbco-lines\u0022\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003etitle\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003econtent\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003ePost\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eslug\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\n\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eQuery\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003efindPost\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eMutation\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003ecreatePost\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eMutation\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eupdatePost\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eMutation\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003etrashPost\u003c/span\u003e\u003c/pre\u003e\u003cpre class=\u0022kbco-line\u0022\u003e\u003cspan class=\u0022kbco-variable\u0022\u003epublisher\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003eblog\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable-2\u0022\u003eMutation\u003c/span\u003e\u003cspan class=\u0022kbco-keyword\u0022\u003e:\u003c/span\u003e\u003cspan class=\u0022kbco-variable\u0022\u003edeletePost\u003c/span\u003e\u003c/pre\u003e\u003c/div\u003e\u003c/div\u003e\n                \u003c/div\u003e"} /-->

<!-- wp:paragraph -->

Hypi creates a resource server for every app. Any and all resources created are owned by this resource server. Hypi also creates a default clients, one in particular is called `web`. 

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

To the point, how does Hypi know if access should be granted or not? Recall from the introduction to IaM post that Hypi allows you to define one or more `Policy` and `Permission`. A permission binds a policy to either a scope or to a resource.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Hypi creates an "owner" based policy which checks if the user querying the resource is the owner, in which case, access is granted.   
  
A policy does not work on its own however, so there is an associated scope based permission which includes all of the scopes listed above.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

With all of that, we've finally covered all of the pieces of how Hypi knows whether access should be granted or denied by simply adding the IaM app as a dependency. All it does is check that the user is the owner.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

This post covers the simple case, in a follow up post we will explain how this check can be extended to use other policies e.g. if a resource has been shared with another user, they will not be the owner, in which case access would be denied based on what has been described here, however, a composite policy can be created which includes the owner based policy described here and another policy which checks if permission has been granted to the user or not.

<!-- /wp:paragraph -->

 [1]: https://hypi.io/docs/technical-docs/identity-and-access-management-aka-authentication-authorisation/
 [2]: https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2