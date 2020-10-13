---
title: "Introduction"
metaTitle: "Introduction to developing apps with Hypi"
metaDescription: "Introduces the concepts involved in building data driven apps on the Hypi platform"
---
## Overview

**Before**  starting with Hypi, it's worth having a good understanding of the ideas involved with the platform.
This introduction aims to get you familiar with these concepts.

## Realm
A  **realm is a namespace** for all your apps. The realm name is used in URLs and cannot be changed once created.

### Organisations
Name of your company/team/group/organisation. You can create as many organisations as you desire. But, there must be at least one organisation in a realm. If your organisation has a Hypi account/realm, please ask your administrator to add you as a member of the team. **Do not register separately; doing so will create an independent realm.**

## App
At the heart of Hypi is the concept of an app.
Hypi uses this concept to encapsulate a collection of models (data types), serverless functions and any other resource your app needs to serve its purpose.

An App can have data models written in `GraphQL` as well as other serverless functions written in `JavaScript`, `Go`, `Java`, `Kotlin`, `Node.js`, `PHP`, `Python`, `Ruby`, `Scala & Shell`. Think of an app as a way to group related behaviour and resources (there is some similarity to a micro-service).

Within an app, you can further define a few things.
* **Release**
  * Schema
  * Dependencies
  * Fields
* **Instance**
  * Instance domain
  * Data (including permission/authorisation)
  * Monitoring/metrics
  * Logs

### Release

A release represents a version of your app. The releases can be used independently. For example, you could create three releases for the same app called `alpha`, `rc` and `prod-1`.
The alpha release can be used for development, the rc release for release candidates and prod for production.

### Schema
A schema is linked to a release and is your way of defining your data model using GraphQL and at the end, generating tables that represent the different models in your app. Everything about your app's APIs is controlled with the schema.

### Dependencies
Hypi allows an app to add one or more dependencies to other apps.
This feature promotes software reuse by enabling you to build small reusable apps that you can add as dependencies in other app.

### Fields & Settings
Fields in Hypi are key-value pairs that allow you to define configuration options that an app needs. Within each release, you can define one or more field and later populate values for those fields for each [instance](#instance) that you create.
Fields that you create in a release become accessible as a `$settings` variable so `$settings.fieldName` gives the value of the field called `fieldName`.
In some other systems, these are commonly known as "[environment variables](/products/axiom/environment-variables)".

### Instance
An instance is an isolated copy of your app.
Think of an app as a template and an instance as a deployed version of that template.
Every instance gets its own [domain](#instancedomain).

### Instance domain
Every instance must have a unique domain. By default Hypi will generate one based on its domain. You're free to use your own domain e.g. `api.my-domain.com`.

### Data
Instances are isolated, data created in once instance is not accessible by default from another instance and only someone with permission can grant access between instances.
