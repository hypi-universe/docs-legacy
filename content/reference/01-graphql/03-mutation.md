---
title: "Mutations"
metaTitle: "Hypi tutorial introducing GraphQL"
metaDescription: "Introduction to on the Hypi platform"
---

## Introduction

As a complete platform we focus on the full cycle of data fetching, but a ways to modify  each app's release data. Similar to queries, mutations field returns an object type, you can ask for any nested fields. Which, are useful for fetching the new state of an object after an update.

## Form a mutation

You must specify three things when defining a mutation:

**1.** `Name of the mutation`, traditionally name after the type of modification you want to perform.

**2.** The `Input object`. This should be pass as an argument to the mutation name as the data you want ot send to the server, composed of `input fields`.

**3.** `Payload object`, The data you want to return from the server, composed of return fields. Pass it as the body of the mutation name.
 

<div className={"code-container"}>

<div className={"code-column"}>

      mutation CreateTodo( $todos: [TodoInput!]!) {
           createTodo(todo: $todo) {
              hypi {
                id
                created
               }
             description
             completed
           }
         }
         
        # Variables
       {
         "todo": [ {
           "description": "This is a great todo!"
            "completed":"false",

         }  ]
       }
</div>
  
<div className={"code-column"}>

    {
          "data": {
            "createTodo": [{
            "hypi": {
                   "id": "c94144ec-52aa-4337-9d8b-15fa8ec5c979"
                   "created": "2019-11-02T15:45:16Z"
               }
             description": "This is a great todo!"
             "completed":"false",
            }]
          }
        }
         
</div>

</div>


