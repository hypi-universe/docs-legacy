---
title: "API Setup"
metaTitle: "Hypi Platform API Documentation"
metaDescription: "Hypi platform documentation describing how to connect to the API for your apps"
---

## Overview

Hypi provides multiple APIs to work with your app.
On this page we outline the various options available to you and how to use them.

Be sure to pay attention to the required headers when using HTTP.

## Required HTTP headers

Every instance of your app has a unique domain name assigned to it.
This domain is required when using the API, along with the authorization header.

The two required header names are:
1. `hypi-domain` - the domain name of the instance you want to make API requests to.
2. `Authorization` - the authorisation header that you must provide with a valid token obtained from running a login query.

> Most APIs require Authorization
>
> Anonymous API access is possible IFF it is enabled on the instance. It is not enabled by default.
>
> Login and register API calls do not require the Authorization header
>
> createAccount does not require the Authorization header IFF anonymous registrations are enabled on the instance. It is disabled by default. When it is disabled, new accounts can only be created by an existing user.

## API URLs

The API URLs you use depend on how you intend to work with you app.

1. https://api.hypi.app/graphql - allows you to execute GraphQL queries against your instance.
2. https://api.hypi.app/rest - allows you to use standard REST-like requests to execute queries against your instance.
3. wss://ws.api.app - allows you to subscribe to updates via websockets.

These URLs are always what you make requests to.
This means in order for the platform to know which of your instances it should route your request to, you must provide the `hypi-domain` header.
