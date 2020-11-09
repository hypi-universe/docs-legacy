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

### Resource or Object
A resource or object is the thing being protected. In Hypi, there are two primary things that can be protected.

1. `Resource` - any object that exists in the Hypi platform
2. `Scope` - Any GraphQL field OR any arbitrary URI

 ### Policy
 A policy encapsulates two important pieces of information, the `subject` in authorisation and whether access should be granted or denied i.e. the logic. There are a number of policies depending on the subject that Hypi supports. One of the main purposes of a policy is to promote re-use. Policies are intended to be created and re-used so that they can be kept as simple as possible. Where necessary, an AggregatePolicy can be used to group multiple policies.

 1. `GroupPolicy` - A group policy applies to list the list of Accounts or Organisations in the groups the policy links to.

      ```
      type GroupPolicy implements Policy {
         groups: [Group!]
      }
      ```

 1. `RolePolicy` - A role policy applies to a list of Roles.
      ```
      type RolePolicy implements Policy {
         roles : [Role!]!
      }
      ```

 1. `AccountPolicy` - Applies to a set of Accounts.
      ```
      type AccountPolicy implements Policy {
         accounts: [Account!]
      }
      ```

 1. `RealmPolicy` - Applies to a set of Realms.
      ```
      type RealmPolicy implements Policy {
         realms: [RealmLink!]
      }
      ```

 1. `TimePolicy` - Allows granting or denying access based on date or time
      ```
      type TimePolicy implements Policy {
         viewable before the given date
         from: DateTime
         to: DateTime
         clients: [AuthClient!]
         roles : [Role!]
         groups: [Group!]
         accounts: [Account!]
         realms: [RealmLink!]
      }
      ```

 1. `ClientPolicy` - Controls access based on the client used to access a resource
      ```
      type ClientPolicy implements Policy {
         clients: [AuthClient!]
      }
      ```

 1. `AggregatePolicy` - allows grouping one or more policies
      ```
      type AggregatedPolicy implements Policy {
         policies: [Policy!]!
         decisionStrategy: DecisionStrategy
      }
      ```

### Permission
A permission encapsulates the object involved in authorisation.

### Update, Delete and Trash, Link and Unlinking a resource
All of these operate on existing resources and as such generates an authorisation request which can type, scope and/or resource based permissions.

### Searching for resources
The platform uses [ArcQL](/references/arcql) for finding data. All requests to get data, no matter how trivial the query, goes through ArcQL. During a search, resources that match that search are further filtered down to only those that the subject is allowed to see.

### Implicit Permission
If no `Permission` exist, the platform acts as if one is implicitly created with an `AccountPolicy` which grants access to the `Account` which created the object.
i.e. the creator of an object has complete access to it by default - no one else does.

## Examples

Below demonstrates how to create a permission to let another account see an object.

```graphql
mutation {
  upsert(
    values: {
      Permission: [
        {
          name: "Grant access to anonymous user"
          decisionStrategy: Unanimous
          type: "File"
          resource: "<file-id>"
          scopes: ["*"]
          operationType: Query
          operations: ["find"]
          #includeAllAccounts: true, //wildcard so all accounts can access
          policies: [
            {
              hypi: { impl: "AccountPolicy" }
              name: "Grant user anonymous access to my file"
              logic: Positive
              accounts: [{ hypi: { id: "anonymous" } }]
            }
          ]
        }
      ]
    }
  ) {
    id
  }
}
```

1. `type` is the GraphQL type that the permission will protect
2. `resource` is the ID of the object of the given type. The account creating the permission must be the owner or be given permission to modify the permission of the object
3. `scopes` is an array of the fields in the type that the user is being given access to. They will get unauthorised if they try to access any other. `*
 can be used to give access to all fields.
4. `operationType` is the name of the operation type i.e. `Query`, `Mutation` or `Subscription`
5. `operations` is a list of fields in the `operationType` e.g. `find`, `upsert` or a custom method you've added
6. `includeAllAccounts` is a boolean where, if true, the permission will apply to all accounts in the app instance.
7. `policies` is used to give access to specific users, groups etc instead of to all accounts. If this is missing then `includeAllAccounts` must be true, likewise if `includeAllAccounts` is false, this must have at least one policy otherwise the permission will have no effect.
