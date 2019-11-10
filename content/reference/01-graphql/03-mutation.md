---
title: "Mutations"
metaTitle: "Hypi tutorial introducing GraphQL"
metaDescription: "Introduction to on the Hypi platform"
---
## Introduction

As a complete platform we focus on the full cycle of data fetching, but a ways to modify  each app's release data. Similar to queries, mutations field returns an object type, you can ask for any nested fields. And, are useful for fetching the new state of an object after an update.

## Form a mutation

You must specify three things when forming a mutation:

1. `Name of the mutation`, traditionally name after the type of modification you want to perform.
2. The `Input object`. This should be pass as an argument to the mutation name as the data you want ot send to the server, composed of `input fields`.
3. `Payload object`, The data you want to return from the server, composed of return fields. Pass it as the body of the mutation name.
 

<div className={"d-flex"}>

<div className={"code-column"}>

      mutation CreateReviewForEpisode($ep: Episode!, 
         $review: ReviewInput!) {
           createReview(episode: $ep, review: $review) {
             stars
             commentary
           }
         }
         
         #Variables
         {
           "ep": "JEDI",
           "review": {
             "stars": 5,
             "commentary": "This is a great movie!"
           }
         }
     
</div>  
<div className={"code-column"}>

    {
          "data": {
            "createReview": {
              "stars": 5,
              "commentary": "This is a great movie!"
            }
          }
        }
         
</div>

</div>


