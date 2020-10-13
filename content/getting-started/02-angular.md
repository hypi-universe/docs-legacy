---
title: "Hypi + Angular"
metaTitle: "Adding Hypi to your front-end"
metaDescription: "How to add Hypi to your frontend clients"
---
##  Overview
Hypi is an ultra-flexible community-driven app development platform. You can use Hypi with any front-end framework of choice like Angular, React, Vue js, native frameworks etc. Hypi is designed from the ground up to make it easy to build scalable data-driven applications, web services and components that fetch data with GraphQL and REST easily. To get started and for demonstration purposes, we are going to integrate Hypi with Angular. You can incorporate Hypi with any other framework.


Here are some things you should consider:
<ol>
<li>

**Incrementally adaptable** — you can drop Hypi into an existing app and start using GraphQL for just part of your UI or web services.
</li>
<li>

**Universally compatible** — Hypi works with any setup, any front-end framework, and any web services.
</li>
<li>

**Easy to start with** —  you can start shaping and fetching your data right away and learn about advanced features later.
</li>
<li>

**Inspectable and understandable**  — GraphQL introspection system is often useful to get information about what queries a schema supports. You can run introspection on your API using other tools like https://graphql-code-generator.com/ to understand precisely what is happening in your app.
 </li>
 </ol>

These docs will help you to go from getting started with Hypi to becoming an expert!
###  Adding Hypi to your client


Things you'll need:
<ol>
<li> <strong>Instance API domian</strong>  — copy or create a instance API domain in Hypi</li>
<li> <strong>Auth token</strong> — copy your auth token from the developer hub</li>
<li> <strong><a href="https://www.apollographql.com/docs/angular/basics/setup/#request-data">Apollo Angular</a></strong> — add apollo angular</li>
<li>  <strong><a href="https://graphql-code-generator.com/">GraphQL Codegen</a></strong>   — add and start using code-gen to inspec and generate  </li>
</ol>

### Installing Angular CLI and Setting Up An Angular Project

Let’s get started with setting up an Angular project. The easiest way to do so is to use Angular CLI. If Angular CLI is not available on your system yet you first need to follow the instructions on https://cli.angular.io/ to install the Command Line Interface. Once it is installed successfully you can use the ng command to initiate a new project:

    $ ng new hypi-angular

Change into the newly created project directory

    $ cd hypi-angular

and start up the live-reloading development web server by executing the following command:

    $ ng serve

### Installing Apollo Client For Angular

In order to use Apollo Client for Angular we need to add a few packages to our project. Execute the following command within the Angular project directory:

    npm install apollo-angular @apollo/client graphql

<ul>
<li>

`@apollo/client` —  Apollo's core
</li>
<li>

`apollo-angular` —  Bridge between Angular and Apollo Client
</li>
<li>

`graphql` —  Most important package
</li>
</ul>

The `@apollo/client` package requires `AsyncIterable` so make sure your tsconfig.base.json includes `esnext.asynciterable`:

    {
      "compilerOptions": {
        // ...
        "lib": [
          "es2018",
          "dom",
          "esnext.asynciterable"
        ]
      }
    }

Great, now that you have all the dependencies you need, let's create you a `graphql.module.ts` file; in here you will setup Apollo and connect to Hypi. Remember to import the `graphql.module.ts` file into the `app.module.ts` file.

In `graphql.module.ts`:

    import { NgModule } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';
    import { APOLLO_OPTIONS } from 'apollo-angular';
    import { HttpLink } from 'apollo-angular/http';
    import { ApolloLink, InMemoryCache } from '@apollo/client/core';
    import { setContext } from '@apollo/client/link/context';

    const uri = 'https://api.hypi.app/graphql/';
    const tokenFromDeveloperHub = 'myToken';

    export function provideApollo(httpLink: HttpLink): any {

      /* Get the authentication token from local storage if it exists or
       * generate one by login a user into their account or
       * the current one can be copied from the Developer Hub"
      */
      const token = localStorage.getItem('myToken') ? localStorage.getItem('myToken') : tokenFromDeveloperHub;
      const auth = setContext((operation, context) => ({
        headers: {
          Authorization: `${token}`
          'hypi-domain': 'hypi-angular.io'
        },
      }));

      const link = ApolloLink.from([auth, httpLink.create({uri, withCredentials: true})]);
      const cache = new InMemoryCache();

      return {
        link,
        cache
      };
    }

    @NgModule({
      exports: [
        HttpClientModule,
      ],
      providers: [{
        provide: APOLLO_OPTIONS,
        useFactory: provideApollo,
        deps: [HttpLink]
      }]
    })
    export class GraphQLModule {
    }


Take a closer look what we did there:
<ol>
<li>

With `apollo-angular/http` and `HttpLink` service we connect our client to Hypi
</li>
<li>

We set our `uri`  `const uri = 'https://api.hypi.app/graphql/';`
</li>
<li>

With `setContext` we added our `hypi-domain` and `Authorization` token
</li>
</ol>


In `app.module.ts`:

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { GraphQLModule } from './graphql.module';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }



How easy was that! Now your client and Hypi are connected. The server can use that header to authenticate the user and modify any behavior based on a user's role and permissions.


### Request data

Once all is hooked up, you're ready to start requesting data using Hypi!
We will show you how easy it is to fetch data from your instance API, you can use the Apollo query method. It is as easy as this:

Generate a profile component using angular CLI

    $ ng g c profile

In `profile.component.ts`:

    import { Component, OnInit } from '@angular/core';
    import { Apollo, gql } from 'apollo-angular';

    @Component({
      selector: 'app-profile',
      template: `
        <div *ngIf="loading">
          Loading...
        </div>
        <div *ngIf="error">
          Error :(
        </div>
        <div *ngIf="profiles">
          <div *ngFor="let profile of profiles">
            <p>Name: <strong>{{ profile.node.username }}</strong></p>
          </div>
        </div>
      `,
      styleUrls: ['./profile.component.scss']
    })
    export class ProfileComponent implements OnInit {
      profiles: any[];
      loading = true;
      error: any;

      constructor(private apollo: Apollo) {
      }

      ngOnInit() {
        this.apollo
        .watchQuery({
          query: gql`
            {
              find(type: Account, arcql:"*"){
                edges{
                  node{
                    ... on Account {
                      username
                      password{
                        value
                      }
                      emails{
                        value
                      }
                    }
                  }
                  cursor
                }
                pageInfo{
                  hasPreviousPage
                  hasNextPage
                  startCursor
                  endCursor
                  pageLimit
                  previousOffsets
                  nextOffsets
                }
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.profiles = result?.data?.find.edges;
          this.loading = result.loading;
          this.error = result.error;
          console.log(result);
        });
      }
    }

