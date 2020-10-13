---
title: "Permissions"
metaTitle: "Hypi tutorial introducing permissions"
metaDescription: "Introduction to application instance permissions on the Hypi platform"
---

## Introduction
Hypi includes three types of permissions.
Resource based permissions applies to specified objects and allows controlling access to them.

Scope based permissions are to control access to GraphQL fields. That includes fields on the `Query`, `Mutation` and `Subscription` types.
This can be used to prevent access to certain GraphQL fields.

Type based permissions apply to all data of a given type. e.g. if your data model has a type called `Orders` it can be used to ensure only those with the `Accounting Team` role can access `Order` records.

*Note:* It is recommended that you use `ResourceBasedPermission` most often. The other two can affect a broad scope and mistakenly deny access to data that they shouldn't apply to.

### ScopeBasedPermission

Scope based permissions control access based on the GraphQL fields of the types in an app.   
There are two types of scope based permissions.

1. Applies only to specific resources
2. Applies globally when no resource specific permission exists

### ResourceBasedPermission
Controls access based on a specific object. 

### TypeBasedPermission
Controls access based on the GraphQL type. 

All three permission types controls who has access to data by applying policies.
