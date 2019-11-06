---
ID: 1294
post_title: >
  Front end web Development with Go-gin
  (Golang)
author: shaurya
post_excerpt: ""
layout: post
permalink: >
  https://hypi.io/blog/2019/10/08/front-end-web-development-with-go-gin-golang/
published: true
post_date: 2019-10-08 10:24:57
---
<!-- wp:paragraph -->
<p>Choice of using a front end framework such as Vue.Js, React or Angular is great however if you are an indie Dev like &amp; need a rapid prototyping methodology with just HTML, CSS &amp; JavaScript then this article is for you.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>To demonstrate step be step, we are going to use Golang's <a href="https://github.com/gin-gonic/gin">Go-Gin</a>. So let's building our base structure of the project with an MVC pattern.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Folder structure</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><li>Create a root folder called hypi-app in your workspace</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>workspace ❯ mkdir -p hypi-app</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Enter the new app directory &amp; Create 3 folders for holding the models, views &amp; controllers for MVC</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>workspace ❯ cd hypi-app &amp;&amp; mkdir {models,views,controlllers}  </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Now Create folders to holder the routes &amp; router</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>workspace ❯ mkdir {routes,router}  </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Let us create templates folder for HTML files &amp; public to serve CSS, Images &amp; JavaScript</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>workspace ❯ mkdir -p {templates/layouts,templates/partials,public/images,public/css,public/js} </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Finally let us  create a main.go, essentially the entry point for the app</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>hypi-app ❯ touch main.go   &amp; mkdir server</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Now we all should have our project structure like this:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">hypi-app ❯ tree
 .
 |____server
 |____models
 |____public
 | |____css
 | |____images
 | |____js
 |____controlllers
 |____templates
 | |____layouts
 | |____partials
 |____views
 |____routes
 |____main.go
 |____router</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2>Web Server's main entry</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We are going to define the servers main entry in main.go file as followed:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package main

func main() {}
</code></pre>
<!-- /wp:code -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">

We will working on this file later.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2>Putting the server together</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Inside server directory create a server.go file and add the following code:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package server

func Init() {}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now  create a router.go in router folder and add the following code in it</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package router

import (
   "github.com/gin-gonic/gin"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())

}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now most importantly let us create system default routes which will help us in handling unknown routes &amp; failures.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Create a file called routes.go and add the following code in it</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package routes

import "github.com/gin-gonic/gin"

func NotFound(route *gin.Engine) {
   route.NoRoute(func(c *gin.Context) {
      c.AbortWithStatusJSON(404, "Not Found")
   })
}

func NoMethods(route *gin.Engine){
   route.NoMethod(func(c *gin.Context) {
      c.AbortWithStatusJSON(405, "not allowed")
   })
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now in the router file let us import the default routes &amp; run "go get -u github.com/gin-gonic/gin" in your terminal     </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package router

import (
   "github.com/gin-gonic/gin"
   "hypi-app/routes"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())

   // System routes
   routes.NotFound(router)
   routes.NoMethods(router)

   return router
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>We now have everything we need to get our server up, let us add the router to server initialization </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package server

import "hypi-app/router"

func Init() {
   r := router.Router()
   r.Run(":3000")
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now we call the server initialization from our main entry point</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code class="">package main

import "hypi-app/server"

func main(){
   server.Init()
}
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>If you have followed along as described then we should be able to run our server &amp; test it, from your hype-app directory run go run main.go<br><br></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">hypi-app ❯ go run main.go
[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
- using env:   export GIN_MODE=release
- using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] Listening and serving HTTP on :3000</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2>Go Views</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We will be using <a href="https://github.com/foolin/goview">go view </a> to define our front end, let us get started &amp; install go-view by typing "go get github.com/foolin/goview" in your terminal</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>create a index.go file and add the following content</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package views

import (
   "github.com/foolin/goview"
   "github.com/foolin/goview/supports/ginview"
   "github.com/gin-gonic/gin"
   "html/template"
   "net/http"
   "time"
)

func IndexView(route *gin.Engine)  {
   app := ginview.NewMiddleware(goview.Config{
      Root:      "templates/",
      Extension: ".html",
      Master:    "layouts/master",
      Partials:  []string{"partials/link",
         "partials/meta",
         "partials/title",
         "partials/scripts_head",
         "partials/scripts_foot"},
      Funcs: template.FuncMap{
         "copy": func() string {
            return time.Now().Format("2006")
         },
      },
      DisableCache: true,
   })



   appGroup := route.Group("/", app)
   {
      {
         appGroup.GET("/", func(ctx *gin.Context) {
            ginview.HTML(ctx, http.StatusOK, "index", gin.H{
               "title": "Hypi App | Hello World!",
            })
         })

      }
   }
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now let us add the view to our router</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package router

import (
   "github.com/gin-gonic/gin"
   "hypi-app/routes"
   "hypi-app/views"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())

   // System routes
   routes.NotFound(router)
   routes.NoMethods(router)

   // Index view
   views.IndexView(router)

   return router
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now let us create a reusable HTML structur,  <mark class="annotation-text annotation-text-yoast" id="annotation-text-fdc13542-5175-41c8-bfb5-d652885cfa68"></mark><mark class="annotation-text annotation-text-yoast" id="annotation-text-fdc13542-5175-41c8-bfb5-d652885cfa68"></mark>under templates/layouts folder create a new file call master.html, this will be the master layout and add the following content</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markup" class="language-markup">&lt;!DOCTYPE html>
&lt;html lang="en">
&lt;head>
    {{template "link" .}}
    {{template "meta" .}}
    {{template "title" .}}
    {{template "scripts_head" .}}
&lt;/head>
&lt;body>
{{include "layouts/header"}}
&lt;div class="core">
    {{template "content" .}}
&lt;/div>

{{include "layouts/footer"}}
{{template "scripts_foot" .}}
&lt;/body>
&lt;/html></code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Create footer, &amp; header HTML files under layouts we will not use it for this tutorial however let us create it to understand the structure. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>now we need to create some partials that can be used in all layouts when needed, under partials directory create a new file named link.html</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{define "link"}}
    &lt;link rel="shortcut icon" href="https://hypi.io/wp-content/uploads/2018/10/cropped-purple@2x-square-white-bg-32x32.png?x83512">
    &lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
    &lt;link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700&amp;display=swap" rel="stylesheet">
{{ end }}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Create a meta.html file and add the following code<br></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{ define "meta"}}
&lt;meta charset="UTF-8">
{{ end }}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Create a scripts_foot.html file and the scripts to be loaded in the footer section</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{define "scripts_foot"}}
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js">&lt;/script>
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js">&lt;/script>
{{end }}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>For now create scripts_head.html file and add the following code but we will not be loading any scripts on header for this go gin front end development  tutorial</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{define "scripts_head"}}
{{end }}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now our last partial which will hold and parse the title for each page, create a title.html &amp; add the following code<br><br></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{define "title"}}
&lt;title>{{.title}}&lt;/title>
{{end}}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now we will create our index.html file with the following code<br><br></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="markdown" class="language-markdown">{{define "content"}}
    &lt;div class="ui stackable grid">
        &lt;div class="ui equal width row row-vh-f">
            &lt;div class="ui column brand-bg-img row-vh-f">&lt;/div>
            &lt;div class="ui column auth-bg middle aligned padded">
                &lt;div class="ui container form segment">
                    &lt;form class="ui form padded">
                        &lt;div class="ui buttons two fluid">
                            &lt;div class="ui animated fluid large fade button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="github icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    Github
                                &lt;/div>
                            &lt;/div>
                            &lt;div class="ui left floated animated fluid large fade basic button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="slack icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    Slack
                                &lt;/div>
                            &lt;/div>
                        &lt;/div>

                        &lt;div class="ui buttons two fluid">
                            &lt;div class="ui animated fluid large fade facebook button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="facebook icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    facebook
                                &lt;/div>
                            &lt;/div>
                            &lt;div class="ui left floated animated fluid large fade twitter button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="twitter icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    twitter
                                &lt;/div>
                            &lt;/div>
                        &lt;/div>

                        &lt;div class="ui buttons two fluid">
                            &lt;div class="ui animated fluid large fade google plus button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="google plus icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    google plus
                                &lt;/div>
                            &lt;/div>
                            &lt;div class="ui left floated animated fluid large fade youtube button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="youtube icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    youtube
                                &lt;/div>
                            &lt;/div>
                        &lt;/div>

                        &lt;div class="ui buttons two fluid">
                            &lt;div class="ui left floated animated fluid large fade vk button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="vk icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    vk
                                &lt;/div>
                            &lt;/div>
                            &lt;div class="ui left floated animated fluid large fade linkedin button" tabindex="0">
                                &lt;div class="visible content">&lt;i class="linkedin icon">&lt;/i>&lt;/div>
                                &lt;div class="hidden content">
                                    linkedin
                                &lt;/div>
                            &lt;/div>
                        &lt;/div>

                        &lt;div class="field">
                            &lt;div class="ui checkbox">
                                &lt;input type="checkbox" tabindex="0" class="hidden">
                                &lt;label>I agree to the Terms and Conditions&lt;/label>
                            &lt;/div>
                        &lt;/div>
                    &lt;/form>
                &lt;/div>
            &lt;/div>
        &lt;/div>
    &lt;/div>
{{ end }}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>All right now let us try running the server  you should see a page like this</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1381,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/P5LMf7C-1024x682.png" alt="" class="wp-image-1381"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Serving Static Content</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Great we have created our own front end structure with MVC pattern. Now this code base can be further extended into a full fledged application when we start writing our controllers &amp; models but it is outside the scope of this article &amp; hopefully i will continue to write in another tutorial.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>But before you start playing around this code base there is one more thing that i would like you to learn which is serving static files as we are doing front end development, So let us create static route and add it to our router to server the files as intended.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Create a static.go file under the routes folder and add the following code</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package routes

import "github.com/gin-gonic/gin"

func PublicImages(route *gin.Engine)  {
   route.Static("/public/images", "./public/images")
}

func PublicCss(route *gin.Engine)  {
   route.Static("/public/css", "./public/css")
}
﻿</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Now include this route in router with the updated code as shown below</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="go" class="language-go">package router

import (
   "github.com/gin-gonic/gin"
   "hypi-app/routes"
   "hypi-app/views"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())



   // System routes
   routes.NotFound(router)
   routes.NoMethods(router)

   // Static Routes
   routes.PublicCss(router)
   routes.PublicImages(router)

   // Index view
   views.IndexView(router)

   return router
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>now let's add a style.css file in the css folder and add the following style.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code lang="css" class="language-css"> h1, h2, h3, h4, h5, h6, p, a {
    font-family: 'Lato', sans-serif !important;
}
.core{
    height:100%;
}


.brand-bg-img{
    background: #2D52A3 url("../media/images/botecho_logo_size_invert.png") no-repeat;
    background-size: contain;
    background-position: left center;
}


.row-vh-f{
    height: 100vh;
}

.auth-bg{
    background-color: #FFFFFF;
}
﻿</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Import the newly added style to link.html</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;link rel="stylesheet" href="../../../../public/css/style.css"/&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>That's it, now run the server with "go run main.go", you should see your new hypi app page like this <br><br></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1382,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://hypi.io/wp-content/uploads/2019/10/EkTmDFs-1024x678.png" alt="" class="wp-image-1382"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br><br>Code for this tutorial can be found <a href="https://github.com/shaurya-xyz/hypi-app-tutorial">here </a>, Have fun!<br><br></p>
<!-- /wp:paragraph -->