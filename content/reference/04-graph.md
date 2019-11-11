---
title: "Graph Queries"
metaTitle: "Hypi tutorial for creating an instance for an app"
metaDescription: "How to create an instances for an app on the Hypi platform"
---

## Introduction

Hypi is a Graph platform which means that it stores data in what are known as vertices and edges.
When you create data in an app, an edge is created between related objects.
Hypi's API provides two functions and a query syntax to allow you to work with edges.

## link
If two objects ARE NOT connected and you want to add a connection between them, use the `link` function.

## unlink
If two objects ARE connected and you want to remove the connection between them without removing the data, use the `link` function.

## REF FROM queries
‌Hypi is a polyglot storage service, one of the supported storage paradigms is for graph data, see the API Guide for more information. ArcQL has support for querying graph data.

`REF FROM '<Origin Type>' ON '<Origin Field>' FOR '<Origin ID>' WHERE <ArcQL filter>`

1. `‌Origin Type` is the name of the GraphQL type from which you would like to find edges
1. `Origin Field` is the name of the field on the Origin Type for which the edge exists
1. `Origin ID` is the ID of the object/vertex to find references from
1. `ArcQL filter` is any valid ArcQL query, this is optional and if present will only return edges that match
