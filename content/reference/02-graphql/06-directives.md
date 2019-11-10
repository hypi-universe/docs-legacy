---
title: "Directives"
metaTitle: "Hypi tutorial introducing GraphQL Directives"
metaDescription: "Introduction to GraphQL directives on the Hypi platform"
---

## Introduction
 We discussed above how variables enable us to avoid doing manual string interpolation to construct dynamic queries. Passing variables in arguments solves a pretty big class of these problems, but we might also need a way to dynamically change the structure and shape of our queries using variables. 


## So, what is a directive
A directive is an identifier preceded by a `@` character, optionally followed by a list of named arguments, which can appear after almost any form of syntax in the GraphQL query or schema languages. 

  For example, we can imagine a UI component that has a summarized and detailed view, where one includes more fields than the other.
   
       query Hero($episode: Episode, $withFriends: Boolean!) {
         hero(episode: $episode) {
           name
           friends @include(if: $withFriends) {
             name
           }
         }
       }
  Variables
  
       {
         "episode": "JEDI",
         "withFriends": false
       }
       
## Built in directives
### @http 

### @tan 

### @api 

### @secret 

### @field 

### @length

### @notNull

### @notEmpty

### @past

### @future

### @pattern

### @email

### @unique
