---
title: "User Defined Functions"
metaTitle: "Hypi Platform CRUD Documentation"
metaDescription: "Hypi platform documentation explaining how to create and use user defined functions."
---

## Overview

User defined functions are a lightweight way for your apps to have custom behaviour outside of what Hypi provides.
They are executed on the same server where your query is being processed.

For this page we've added the following schema

```graphql
type Query {
  callGql(app: String):App @tan(type:Groovy, name:"groovy1")
  inlineGroovyFunction(a: String, b: Int, c: Boolean):Json @tan(type:Groovy, inline: """
    def map = new java.util.LinkedHashMap()
    map.put("a", a)
    map.put("b", b)
    map.put("c", c)
    return map
  """)

  inlineVelocityFunction(a: String, b: Int, c: Boolean):String @tan(type:Velocity, inline: "$a,$b,$c")
}
```

The `@tan` directive is Hypi's mechanism for adding user defined functions to a field.
When a field containing this directive is called, the function will be executed.

Hypi supports `Groovy` and `Velocity` templates for user defined functions.
Groovy is a general purpose programming language, it is fast, flexible and succinct.
Velocity is a templating language and framework. Usually used when you want to format some string output.
For example, if you wanted to customise an email message by adding the user's name, Velocity may be a good choice.

There are two ways to define user defined functions, either inline or via a `Script`.

## Example

The `inlineGroovyFunction` is an example of how to create an inline Groovy function.
We deliberately used the `java.util.LinkedHashMap` here to demonstrate that access to Java classes is possible.
A more Groovy like version could look like this :

```graphql
  inlineGroovyFunction(a: String, b: Int, c: Boolean):Json @tan(type:Groovy, inline: """
    return [
      a: a,
      b: b,
      c: c
    ]
  """)
```

<div className={"code-container"}>

<div className={"code-column"}>

```
#GraphQL query
{
  inlineGroovyFunction(a:"val1", b:23, c: true)
}
```
</div>
<div className={"code-column"}>

```json
{
  "data": {
    "inlineGroovyFunction": {
      "a": "val1",
      "b": 23,
      "c": true
    }
  }
}
```
</div>

</div>

As you can see, an inline function is executed in exactly the same way as any other GraphQL query.
