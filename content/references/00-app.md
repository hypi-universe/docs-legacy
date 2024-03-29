---
title: "Apps"
metaTitle: "Hypi Platform CRUD Documentation"
metaDescription: "Hypi platform documentation for describing what an app is and how to create one."
---

**Hypi** is centered around Apps. An App acts as a container or namespace for a group of related features including but not limited to the Data Models, Scripts, Auth Policies and more.

Hypi is an App oriented Platform, so much so almost every operation possible on the platform is done through an existing app, even creating an app uses the Hypi store app to create other apps.

![Create an App](../assets/img/create-app.gif "Create app")


## Releases
A release represents a version of an App. Versioning is a critical component of your app updates and maintenance strategy. Versioning is important because:

* Each release/version is independent.
* Other apps — apps can depend on other apps, when adding a dependency the release is required.

### Create a release
To create a new release go to the Hypi dashboard of the desired Realm.
1. Click on the App you wish to create a release for.
2. Click the releases tab on the left. Then click “New” top right.

![Create an release](../assets/img/create-release.gif "Create a release")

### Add dependencies
Hypi features the very powerful capability of App inheritance where a dependency can be added to any App you have access to. Adding an App dependency immediately extends the API of your App so that all features in the dependencies become available for your App to use.

Hypi includes a "core" App which provides numerous features by default and is required. It defines essential data models e.g. to represent an Account.


![Add dependencies](../assets/img/add-depend.gif "Add dependencies")

### Add Fields
Instance fields provide a way for an App to have templated fields that are configurable on a per instance basis.

A good example of where instance fields are useful is to hold configuration fields for an app for example a URL or API key (if your app is integrating with external services).

Instance fields can later be accessed in serverless functions when they execute.

![Add Fields](../assets/img/add-fields.gif "add fields")


## Schema
Each created release have a demo data model, so you can get a quick start,  click on the "Editor" link to get access to the editor. You'll notice that the releases are to the left of the editor with a folder named after each created release.

![Add Fields](../assets/img/schema.gif "Editing a schema")

In this image there is only one release, the schema editor allows you to enter GraphQL definitions that will serve as the basis for the Apps data model and APIs.

Currently the editor only have two modes **Save** and **Beautify**, simply click "save" to save your changes, the editor **doesn't save automatically**. Click, "Beautify" to clean up your code once done.


## Instances
An Instance represents an addressable version of an App, by creating an Instance, you can assign a custom domain or an auto-generated Hypi domain.

### Create an Instance
To create an Instance, simply click "Create" top right and fill in the required fields in the modal.
Instances have unique domains in Hypi. **Two instances cannot share the same domain** but multiple instances can be created with custom domains as shown below.

![Add Fields](../assets/img/create-instance.gif "Creating Instance")

Once an Instance is created, the domain is then used as the hypi-domain header that can be provided when working with an app's API.

    {
      "url": "https://api.hypi.app/graphql/",
      "headers": {
         "Authorization":"Auth Token here. Generate one by login a user into their account or the current one be copied from the Developer Hub",
         "hypi-domain": "my-domain.com"
      }
    },

<br/>

### Editing Fields
Fields in Hypi are **key value pairs** that allow you to define configuration options that an app needs. On each release, you define one or more field and later populate values for those fields for each Instance that you create or you can set a default value when creating a fields. **
Fields that you create in a release become accessible as a `$settings` variable so `$settings.fieldName` gives the value of the field called `fieldName`.
**

  ![Editing field](../assets/img/editing-fields.gif "Editing fields")

### API Editor
**An in-browser IDE for exploring your Instance GraphQL API.** You can run queries and mutations against API or quickly see the docs and schema for you Instance API.

  ![API Editor](../assets/img/api-editor.gif "API Editor")
