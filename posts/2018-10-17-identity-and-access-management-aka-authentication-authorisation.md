---
ID: 546
post_title: 'Identity and Access Management AKA Authentication &#038; Authorisation'
author: zcourts
post_excerpt: ""
layout: post
permalink: >
  https://beta.hypi.io/blog/solutions/identity-and-access-management-aka-authentication-authorisation/
published: true
post_date: 2018-10-17 18:39:36
---
<!-- wp:heading -->

## [][1]Overview

<!-- /wp:heading -->

<!-- wp:paragraph -->

Authentication & Authorisation are both done through GraphQL as are all other API requests.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

There are several pieces to authentication and authorisation. Some are implicit, some explicit.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

To be able to do anything, a user must first be logged in. After logging in, the user receives an access token. From this point onwards, lets assume "subject" refers either to the user or an app acting on behalf of a user.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

In order for an app to get data for a user the user must install the application. During the install, if the app being installed uses any other application's data the user must confirm installation of those applications and their dependencies, if they're not already installed. If the apps depended on are already installed the user is told that the new app will be able to access data from the apps it depends on.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

We may need a mechanism to allow users to deselect some fields that an app cannot access from other apps.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The "authorisation" that the user gives at this stage is largely symbolic.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

When an application is installed it is installed to an organisation. We do this so that we can put all data for an organisation into its own namespace. This means an app does not have to design its schema to account for multiple tenants. Each installation can be thought of as a separate instance (although it will be possible to share data across instances in the future).

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The user installing the application must have the permission to do so for that organisation.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## [][2]Authentication

<!-- /wp:heading -->

<!-- wp:paragraph -->

Whe a user signs in, they pass their username + password in graphql. The user token is returned to the client/browser and set as a cookie. This access token a pseudo "requesting party token", it is not a Keycloak RPT, it's an actual Keycloak `access token`. However, we use it as if it is an RPT. This token cannot be used to perform any operations other than to get an `app token`, any other query with it will fail.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

When an app is loaded, it must pass the `access token` to the API to obtain an `app token`. The app token can then be used in subsequent requests to perform data operations. No action can be taken with a user `access token` other than obtaining the `app token`.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

The Hypi shell is optional, if it is used then it will handle `access token` conversion to `app token`. By default the shell is used i.e. accessing `realm.hypi.app/publisher.app-name` loads the shell which sends request to `app-name.publisher.app.hypi.app?access_token=<app-token>`.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Back to the app shell: When it loads an app, it does most of this implicitly. Since it owns the user token, it obtains an app token for each app it loads. <del>Once it obtains the app token, it passes it to the iframe using <code>postMessage</code>.</del> <del>If an app token already exists for the currently loaded app, it fetches it from the cookie.</del>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

App tokens expire when the user token expires. Long lived app tokens are not supported for now.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## [][3]Authorisation

<!-- /wp:heading -->

<!-- wp:paragraph -->

Authorisation is granular to the field level. Every GraphQL query is executed via a function(field). These functions should all perform different tasks e.g. create, read, update, delete, share etc As a result, we protect the functions and enable definition of policies around them. The list of things that can be protected are:

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  GraphQL functions on a per app basis, this protection is Type based
2.  Records created by these functions, this protection is Type:ID based
3.  Non-record assets e.g. images/files, this protection is HTTP URI based

<!-- /wp:list -->

<!-- wp:paragraph -->

Further more, restrictions can be applied on a per `Client` basis. Every image deployed with a release has a client generated for it. The credentials for the client are mounted into the container at `/hypi/auth.json`. This will contain an `accessToken` field specifically for this image that will be given all permissions allowed by that image.

<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->

### [][4]Concepts

<!-- /wp:heading -->

<!-- wp:paragraph -->

Before we go any further, let's take a step back and clarify the various concepts involved.

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `Subject` - represents the user or system performing an action on behalf of a user.
2.  `Resource` - The thing being protected e.g. a GraphQL type, records for a type or assets of an app
3.  `Policy` - contains the knowledge/logic of whether access should be granted or denied.
4.  `Permission` - associates a policy with a resource
5.  `Realm` - a mechanism of isolation/namespace
6.  `Realm Clients` - `Clents` are agents that act on behalf of a `User`. `Realm Client` is specific to a given `Realm`, i.e. it can only act on `Resource`s within that realm. There are a number of `Client`s in Hypi. At this point they are created implicitly and can be referenced by name where they are used e.g. in defining client based policies. The types of clients that are created are grouped under:
    1.  App client - when a publisher creates an app, each `image` in the app implicitly creates a client, if that image communicates with Hypi on behalf of a user, it must use its client credentials that Hypi mounts as a file at `/hypi/auth.json`.
        *   This client can for example have broader permissions than user clients since it will run inside the Hypi network it will be more secure than user clients that run on user devices.
    2.  User client - currently one user client is created called `web`, in the future, Hypi plans to explicitly add `mobile`, `desktop` and `sensor` clients and allow policies to be defined to control their access.
7.  `Groups` - A mechanism for providing a collection of `Subject`s, `Roles`, `Policy`,`Scope` and `Permissions`
8.  `Roles` - A domain/organisation specific means of labelling a set of `Subject`s
9.  `User` - A person (typically) who can have `Realm Client`s act on their behalf
10. `Policy` - Roles/logic that determine if permission is granted or denied on a `Resource`
11. `Scope` - Typically an action that can be performed on a `Resource`

<!-- /wp:list -->

<!-- wp:paragraph -->

A `Subject` owns `Resource`s of which there are a few types:

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `GraphQL functions` - functions called via GraphQL
2.  `Records` - Data created via `GraphQL functions`
3.  `Assets` - Any non-record data e.g. images or other files that belong to an app.

<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### [][5]Authorisation in Hypi

<!-- /wp:heading -->

<!-- wp:paragraph -->

A number of authorisation actions are implicit in Hypi. There are primarily three ways permissions are granted:

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  Hypi automatically generates some implicit permissions which provide default access. By default, Hypi is very permissive, granting access to all users in a realm to everything in the realm by default. It is expected that an administrator will configure this behaviour to provide a more restrictive setup if it is needed.
2.  An app developer defines default and thus implicit permissions for their app as well as suggested roles. When an app is installed these roles become available for app users to use.
3.  User/Subject defined roles and their associated policies.

<!-- /wp:list -->

<!-- wp:paragraph -->

An example of what is involved may be described like this:

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Imagine you are creating a ground breaking new app called Twitter. It allows its users to publish short messages that provides updates/news to the rest of the organisation. The new app allows you to choose to send updates to all users in the organisation, to specific groups or to teams within a branch or subsidiary (your app is for a very large organisation). Finally, you can also send create these short messages and publish them privately so only you can access them(sad times), or share with one or more specific users i.e. direct and "group" messages.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Let's break these down into concepts involved as far as authorisation is concerned.

<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->

1.  `Organisation` and `Subsidiary` - this represents a company or subsidiary of a company. In Hypi, this is just a `Group`. Hypi `Group`s are optionally hierarchical, when a parent is defined a `Group` will inherit the settings of its parent i.e. the parent policies will be applied to the children.
2.  `Branch`, `Department`, `Teams` and `User Group` - these are again Hypi `Group`s. `User Group` is distinguished here because this represents what the user would consider a group. For example, the organisation could have social groups e.g. `Football Club`, these all map to a Hypi `Group` object, the difference is that the UI presents these in a user friendly way using terms that makes sense for the user. They're all simply `Group`s however. By default, on registration, Hypi creates a single `Group` whose name is the same as the organisation's name they registered with.
3.  `Policy` - A policy can be based on
    1.  `Role` - role based policy determines if access is granted or denied depending on the roles a user has. Properties of this are:
        *   `name: String!`
        *   `roles : [AuthRoleSpec!]!` - list of roles to which the policy applies and whether the role is required for the policy to apply or not `AuthRoleSpec` is role name + required
        *   `clients: [String!]` - list of clients to which the policy applies, this allows restricting what kind of data can be viewed depending on how the user is accessing the app e.g. mobile vs web client can have different permissions. These are optional, if not defined the policy applies to all clients
        *   `clientRoles: [String!]` - list of client specific roles this applies to, optional, if not provided applies to all client roles if any exist
        *   `logic: AuthLogic` - `Positive` or `Negative`, if positive then permission is granted when the user has all the required roles specified by the policy, if negative permission is denied. Typically, role based policies are a good way to define a "catch all" policy for a `Group`.
    2.  `Client` - client based policies determine if the client being used to access data is allowed. In cases where for example the client is `web` the app can decide that `web` clients cannot see certain data thus preventing potential leaks of otherwise secure information. In the same way, an app client can be allowed to see this data because its communication with Hypi is encrypted and not vieable by users. Properties of this are:
        *   `name: String!`
        *   `clients: [String!]!` - a list of client IDs e.g. `web` which the policy applies to.
        *   `logic: AuthLogic` - `Positive` or `Negative`, if positive then permission is granted when the client is any of those provided in the policy, if negative permission is denied.
    3.  `Time` - time based policies take effect during the periods for which they're specified. e.g. define holiday policies Properties of this are:
        *   `name: String!`
        *   `notBefore: DateTime` - (yyyy-MM-dd hh:mm:ss) can be used for example to ensure a file is not viewable before the given date
        *   `notOnOrAfter: DateTime` - can be used to ensure a file is not viewable after a given date
        *   `dayOfMonth: AuthInterval` - applies during the given interval, if only start is given then applies only on that day, if both then between those days
        *   `month: AuthInterval`
        *   `year: AuthInterval`
        *   `hour: AuthInterval`
        *   `minute: AuthInterval`
        *   `logic: AuthLogic` - `Positive` or `Negative`
    4.  `Aggregated` - this type of policies provides a means of combining policies i.e. a policy of policies. Properties of this are:
        *   `name: String!`
        *   `policies: [String!]!` - list of policies which this policy aggregates
        *   `decisionStrategy: [AuthDecisionStrategy]` - defines how the policy arrives at a decision, the options are:
            *   `Unanimous` - all policies listed must be positive for this policy to result in a positive decision
            *   `Affirmative` - at least one policy listed must be positive for this policy to result in a positive decision
            *   `Consensus` - The number of policies that are positive must be greater than those that are negative e.g. if 5 policies are included, at least 3 must be positive for this policy to be positive
        *   `logic: AuthLogic` - `Positive` or `Negative`
    5.  `Group` - A group based policy allows access to be granted or denied based on the group Properties of this are:
        *   `name: String!`
        *   `groups: [AuthGroupOptions]!` - a set of groups to which the policy applies, `AuthGroupOption` is simple the group name and a boolean indicating if the policy extends to children of this group.
        *   `logic: AuthLogic` - `Positive` or `Negative`
    6.  `User` - this type of policy applies on a per user basis, only users listed in this policy are allowed or denied Properties of this are:
        *   `name: String!`
        *   `users: [String!]!` - list of usernames to which this policy applies
        *   `logic: AuthLogic` - `Positive` or `Negative`
4.  `Permission` - Permissions associates a `Policy` with a `Resource` or a `Scope`. For example, sharing a tweet in our application can have permissions applied to the tweet record i.e. the resource or the the permission could be applied to the `GraphQL` function determining if the user can create a record in the first place or not, here the function would be the scope.
    1.  `Resource Based` - applies to specific resources or to all resources of a specific type Properties of this are:
        *   `name: String!`
        *   `resources: [ID!]` - a set of IDs for resources which this permission applies to. These can be added and removed as necessary
        *   `type: [String!]` - a set of types of the resources that this permission applies to.
        *   `policies: [String!]!` - list of policies which this policy aggregates
        *   `decisionStrategy: AuthDecisionStrategy` - defines how the policy arrives at a decision, the options are:
            *   `Unanimous` - all policies listed must be positive for this policy to result in a positive decision
            *   `Affirmative` - at least one policy listed must be positive for this policy to result in a positive decision
            *   `Consensus` - The number of policies that are positive must be greater than those that are negative e.g. if 5 policies are included, at least 3 must be positive for this policy to be positive Internally a permission is duplicated for each resource in the `resources` or `type` arrays (maps each to a permission in Keycloak).
    2.  `Scope Based` - scopes are broader than resources and tend to apply to things in an administrative way but can be used for resources too. A scope simple has a name e.g. `publisher:App Name:Type:functionName` or `publisher:AppName:imageName:endPoint` A `Scope` is automatically created for the following things:
        *   `GraphQL functions` - every function is treated as a scope and enables the creation of permissions on specific functions so use of a function can be granted or denied
        *   `Endpoint` - when an app is created, each image defines endpoints which are reachable, each endpoint becomes a scope that can be protected with scope based permissions Properties of scope based permissions are:
        *   `name: String!`
        *   `resources: [ID!]` - a set of IDs for resources which this permission applies to. These can be added and removed as necessary
        *   `scopes: [String!]` - a set of scopes this applies to.
        *   `policies: [String!]!` - list of policies which this permission associates with this permission and thus resources
        *   `decisionStrategy: AuthDecisionStrategy` - defines how the policy arrives at a decision, the options are:
            *   `Unanimous` - all policies listed must be positive for this policy to result in a positive decision
            *   `Affirmative` - at least one policy listed must be positive for this policy to result in a positive decision
            *   `Consensus` - The number of policies that are positive must be greater than those that are negative e.g. if 5 policies are included, at least 3 must be positive for this policy to be positive

<!-- /wp:list -->

 [1]: https://gist.github.com/zcourts/274edf43a528230f4b8bb432bb0ee81e#overview
 [2]: https://gist.github.com/zcourts/274edf43a528230f4b8bb432bb0ee81e#authentication
 [3]: https://gist.github.com/zcourts/274edf43a528230f4b8bb432bb0ee81e#authorisation
 [4]: https://gist.github.com/zcourts/274edf43a528230f4b8bb432bb0ee81e#concepts
 [5]: https://gist.github.com/zcourts/274edf43a528230f4b8bb432bb0ee81e#authorisation-in-hypi