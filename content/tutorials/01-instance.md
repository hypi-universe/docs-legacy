---
title: "Instances"
metaTitle: "Hypi tutorial on working with instances"
metaDescription: "How to create an instances for an app on the Hypi platform"
---

## Overview
**Let's recap.** An instance is an isolated copy of your app. Think of an app as a template and an Instance as a deployed version of that template. Every Instance gets its own domain.

Every Instance must have a unique domain. By default, Hypi will generate one based on the Hypi domain. You're free to use your domain, e.g. api.my-domain.com.

Instances are isolated, data created in one Instance is not accessible by default from another Instance and only someone with permission can grant access between instances.

### Creating an Instance

Click "Create" top right and fill in the required fields in the modal. If there are fields attached to a release, by default the Instance will hold those defined fields, which you can use to integrate or reach out to another source.

Once you have created your Instance, with a `unique domain`,  the domain is then used as the `hypi-domain ` header with your `Authorization` token, which is provided when working with an app's Instance  API.

**Example header**

    {
      "url": "https://api.hypi.app/graphql/",
      "headers": {
         "Authorization":"Auth Token here. It can be copied from the Developer Hub",
         "hypi-domain": "my-domain.com"
      }
    },

**Creating an Instance**

![Add Fields](content/assets/img/create-instance.gif "Creating instance")
