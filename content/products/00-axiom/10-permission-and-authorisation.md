---
title: "Authorisation"
metaTitle: "Hypi tutorial introducing authorisation"
metaDescription: "Introduction to application instance authorisation on the Hypi platform"
---

## Introduction
[Authorisation](https://en.wikipedia.org/wiki/Authorization) is the process which leads to a decision of whether access should be allowed or denied. In classic authorisation models there is a triple consisting of subject, object and action. For the most part, Hypi keeps these but enhances them a bit.

Authorisation depends on checking whether an [authenticated](https://en.wikipedia.org/wiki/Authentication) subject is allowed by the available Permissions to access some resource (the object). Hypi's authorisation model is similar to but is not a compliant implementation of user
 [managed access control](https://en.wikipedia.org/wiki/User-Managed_Access) /UMA.

 ## Concepts
 There are some concepts involved in Authorisation:

### Subject
A subject is the entity trying to perform an action or gain access to a resource.
Resource or Object
A resource or object is the thing being protected. In Hypi, there are three primary things that can be protected.

​1. `Resource` - any object that exists in the Hypi platform
​2. `Scope` - Any GraphQL field OR any arbitrary URI
​3. `Type` - Any GraphQL field

 ### Policy
 A policy encapsulates two important pieces of information, the `subject` in authorisation and whether access should be granted or denied i.e. the logic. There are a number of policies depending on the subject that Hypi supports. One of the main purposes of a policy is to promote re-use. Policies are intended to be created and re-used so that they can be kept as simple as possible. Where necessary, an AggregatePolicy can be used to group multiple policies.

 1. `GroupPolicy` - A group policy applies to list the list of Accounts or Organisations in the groups the policy links to.

 1. `RolePolicy` - A role policy applies to a list of Roles.

 1. `AccountPolicy` - Applies to a set of Accounts.

 1. `RealmPolicy` - Applies to a set of Realms.

 1. `TimePolicy` - Allows granting or denying access based on date or time

 1. `ClientPolicy` - Controls access based on the client used to access a resource

 1. `AggregatePolicy` - allows grouping one or more policies

### ​Permission​
A permission encapsulates the object involved in authorisation.

1. `‌​Resource Based` - Allows protecting a specific resource by ID
1. `Scope Based` - Allows protecting either a GraphQL field or an arbitrary URI pattern
1. `Type Based` - Allows protecting a GraphQL type

### Policy decision point or PDP
PDP is an internal implementation detail but is worth being aware of, it is the thing that brings permissions and policies together to make a decision as to whether an action should be allowed or denied.

‌1. `Creating a new object`, the entity graph will use the PEP to ensure that the subject can call the create function i.e.`the subject has access to the Mutation:create<type> scope`

2.`Updating an existing object`, the entity graph will use the PEP to ensure that the subject has access to the object
   * If no scope based permission exist that applies to the object then access to the object implies access on all scopes
   * If a scope based permission exist which applies to the object then the entity graph verifies that the `Mutation:update<type>` scope for the object grants access otherwise the update is not allowed

3.`Searching with ArcQL`, an object is only included in search results if the subject making the query is allowed to see the object.
   * If no scope based permission exist that applies to the object then access to the object implies access on all scopes

   * If a scope based permission exist which applies to the object then the entity graph verifies that the `Query:find<type>` scope for the object grants access otherwise the search is not allowed

4.`Custom GraphQL function`, Hypi's GraphQL instrumentation uses the PEP to verify that the subject is granted access to the scope before evaluating the custom function. It verifies` Query:<customFunctionName>` or `Mutation:<customFunctionName>` grants access. It is recommended that one scope based permission be used to contain multiple scopes since all scopes in the realm that are not resource specific must be evaluated to see if the apply. This means more scope scope based permissions potentially impacts performance.

### Policy administration point or PAP
PAP is an internal implementation detail which controls which subjects get to operate on authorisation policies. It is the quintessential answer to the question of ["Who will guard the guards themselves?"](https://en.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F). The PAP's job is to ensure that only the subjects that are allowed, can actually change the authorisation policies in the system. In a nutshell policies are treated like other resources to access them, a subject must be the creator or has had a policy created by an authorised subject which grants them access. The rules for authorisation requests are expounded below.

## Authorisation Requests
As already mentioned there are three things that can be protected types, scopes and resources, depending on what's being done a different authorisation request is generated.

### Creating a resource
Creating a resource requires that either no scope based permission exist that applies to the type of resource being created or that at least one exists which grants permission on the `Mutation:create<type>` scope.

### Update, Delete and Trash, Link and Unlinking a resource
All of these operate on existing resources and as such generates an authorisation request which can type, scope and/or resource based permissions.

### ‌Searching for resources
The platform uses [ArcQL](/reference/02-arcql) for finding data. All requests to get data, no matter how trivial the query, goes through ArcQL. During a search, resources that match that search are further filtered down to only those that the subject is allowed to see. The query engine uses the PEP to check if the subject can see the resource and if it says no then the resource is not included in the matching resources.

### Evaluation of authorisation requests
Evaluation follows a series of rules that may not necessarily be intuitive at first. In the first place, we allow multiple permissions to be defined that affects the same object. When this happens, there is a default decision strategy that applies to the entire Realm. This is used to resolve ambiguity, if not explicitly set, it defaults to Unanimous, meaning all must grant access.

First, permission types are prioritised (most important first)

1. [ResourceBasedPermission](/reference/04-authorisation/01-permissions)
2. [ScopeBasedPermission](/reference/04-authorisation/01-permissions)
3. [TypeBasedPermission](/reference/04-authorisation/01-permissions)


This means that if an object has a `ResourceBasedPermission`, it overrides `ScopeBasedPermission` which in turn overrides `TypeBasedPermission`.
Regardless of the type of [Permission](/reference/04-authorisation/01-permissions) , there are two explicit cases and one implicit.

> Any permission that has no policy attached results in a permission denied for any object the permission would otherwise apply to.


### Implicit Permission
If no `ResourceBasedPermission` exist, one is implicitly created with an `AccountPolicy` which grants access to the `Account` which created the object.

‌
If there is a `ResourceBasedPermission`, an `AccountPolicy` is added to it which grants access to the `Account` which created the resource. This behaviour means that by default a resource is always accessible to the Account which created it.

‌
If an administrator would like to prevent the creator of a resource from accessing it then a `ResourceBasedPermission` MUST be explicitly created AND it should use the "Unanimous" decision strategy to result in a permission denied for the creator

> We recommend always creating a resource based permission for every object. Scope and type based permissions are very good for creating broad policies but are easier to get wrong when building complex authorisation scenarios.

 ### Explicit Permission
When only a single permission exists that applies to an object, there can be no ambiguity since the "decision strategy" is used to resolve any such case within the permission.

**Multiple permission rules**
The problem with multiple permissions that apply to the same resource is ambiguity. The platform's approach to resolving ambiguity is to use the global realm level decision strategy.**These rules apply IF AND ONLY IF there are multiple permissions that apply.**

‌
**Resource based authorisation requests**,
When an authorisation request is made for a specific resource any `ResourceBasedPermission` that exist this implies access for the types and scopes on that resource (whether the `ResourceBasedPermission` was implicit or explicitly created. This means that any `ScopeBasedPermission` or `TypeBasedPermission` that may otherwise have applied will be ignored.

**Scope & Type based authorisation requests**,
When the authorisation request is either scope or type based permission is implicitly granted if no explicit permission exists of those types. If at least one scope or type based permission is available that applies then they are used to determine if access is granted or denied. Note this is contrary to resource based authorisation requests since there is always at least one resource based policy.
