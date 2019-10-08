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

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package main

func main() {}

We will working on this file later.
</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2>Putting the server together</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Inside server directory create a server.go file and add the following code:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package server

func Init() {}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now  create a router.go in router folder and add the following code in it</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package router<br><br>import (<br>   "github.com/gin-gonic/gin"<br>)<br><br>func Router() *gin.Engine  {<br><br>   router := gin.New()<br>   router.Use(gin.Logger())<br>   router.Use(gin.Recovery())<br><br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now most importantly let us create system default routes which will help us in handling unknown routes &amp; failures.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Create a file called routes.go and add the following code in it</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package routes<br><br>import "github.com/gin-gonic/gin"<br><br>func NotFound(route *gin.Engine) {<br>   route.NoRoute(func(c *gin.Context) {<br>      c.AbortWithStatusJSON(404, "Not Found")<br>   })<br>}<br><br>func NoMethods(route *gin.Engine){<br>   route.NoMethod(func(c *gin.Context) {<br>      c.AbortWithStatusJSON(405, "not allowed")<br>   })<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now in the router file let us import the default routes &amp; run "go get -u github.com/gin-gonic/gin" in your terminal     </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package router

import (
   "github.com/gin-gonic/gin"
   "hypi-app/routes"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())

   <strong><em>// System routes
   </em>routes.NotFound(router)
   routes.NoMethods(router)</strong>

   <strong>return router</strong>
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>We now have everything we need to get our server up, let us add the router to server initialization </p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package server

import "hypi-app/router"

func Init() {
   r := router.Router()
   r.Run(":3000")
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now we call the server initialization from our main entry point</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package main<br><br>import "hypi-app/server"<br><br>func main(){<br>   server.Init()<br>}<br></pre>
<!-- /wp:preformatted -->

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

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package views<br><br>import (<br>   "github.com/foolin/goview"<br>   "github.com/foolin/goview/supports/ginview"<br>   "github.com/gin-gonic/gin"<br>   "html/template"<br>   "net/http"<br>   "time"<br>)<br><br>func IndexView(route *gin.Engine)  {<br>   app := ginview.NewMiddleware(goview.Config{<br>      Root:      "templates/",<br>      Extension: ".html",<br>      Master:    "layouts/master",<br>      Partials:  []string{"partials/link",<br>         "partials/meta",<br>         "partials/title",<br>         "partials/scripts_head",<br>         "partials/scripts_foot"},<br>      Funcs: template.FuncMap{<br>         "copy": func() string {<br>            return time.Now().Format("2006")<br>         },<br>      },<br>      DisableCache: true,<br>   })<br><br><br><br>   appGroup := route.Group("/", app)<br>   {<br>      {<br>         appGroup.GET("/", func(ctx *gin.Context) {<br>            ginview.HTML(ctx, http.StatusOK, "index", gin.H{<br>               "title": "Hypi App | Hello World!",<br>            })<br>         })<br><br>      }<br>   }<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now let us add the view to our router</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package router<br><br>import (<br>   "github.com/gin-gonic/gin"<br>   "hypi-app/routes"<br>   "hypi-app/views"<br>)<br><br>func Router() *gin.Engine  {<br><br>   router := gin.New()<br>   router.Use(gin.Logger())<br>   router.Use(gin.Recovery())<br><br>   <em>// System routes<br></em><em>   </em>routes.NotFound(router)<br>   routes.NoMethods(router)<br><br>   <em>// Index view<br></em><em>   </em>views.IndexView(router)<br><br>   return router<br>}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now let us create a reusable HTML structur,  <mark class="annotation-text annotation-text-yoast" id="annotation-text-fdc13542-5175-41c8-bfb5-d652885cfa68"></mark><mark class="annotation-text annotation-text-yoast" id="annotation-text-fdc13542-5175-41c8-bfb5-d652885cfa68"></mark>under templates/layouts folder create a new file call master.html, this will be the master layout and add the following content</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">&lt;!DOCTYPE html&gt;<br>&lt;html lang="en"&gt;<br>&lt;head&gt;<br>    {{template "link" .}}<br>    {{template "meta" .}}<br>    {{template "title" .}}<br>    {{template "scripts_head" .}}<br>&lt;/head&gt;<br>&lt;body&gt;<br>{{include "layouts/header"}}<br>&lt;div class="core"&gt;<br>    {{template "content" .}}<br>&lt;/div&gt;<br><br>{{include "layouts/footer"}}<br>{{template "scripts_foot" .}}<br>&lt;/body&gt;<br>&lt;/html&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Create footer, &amp; header HTML files under layouts we will not use it for this tutorial however let us create it to understand the structure. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>now we need to create some partials that can be used in all layouts when needed, under partials directory create a new file named link.html</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{define "link"}}<br>    &lt;link rel="shortcut icon" href="https://hypi.io/wp-content/uploads/2018/10/cropped-purple@2x-square-white-bg-32x32.png?x83512"&gt;<br>    &lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" /&gt;<br>    &lt;link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700&amp;display=swap" rel="stylesheet"&gt;<br>{{ end }}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Create a meta.html file and add the following code<br></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{ define "meta"}}<br>&lt;meta charset="UTF-8"&gt;<br>{{ end }}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Create a scripts_foot.html file and the scripts to be loaded in the footer section</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{define "scripts_foot"}}<br>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"&gt;&lt;/script&gt;<br>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"&gt;&lt;/script&gt;<br>{{end }}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>For now create scripts_head.html file and add the following code but we will not be loading any scripts on header for this go gin front end development  tutorial</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{define "scripts_head"}}<br>{{end }}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now our last partial which will hold and parse the title for each page, create a title.html &amp; add the following code<br><br></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{define "title"}}<br>&lt;title&gt;{{.title}}&lt;/title&gt;<br>{{end}}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now we will create our index.html file with the following code<br><br></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">{{define "content"}}<br>    &lt;div class="ui stackable grid"&gt;<br>        &lt;div class="ui equal width row row-vh-f"&gt;<br>            &lt;div class="ui column brand-bg-img row-vh-f"&gt;&lt;/div&gt;<br>            &lt;div class="ui column auth-bg middle aligned padded"&gt;<br>                &lt;div class="ui container form segment"&gt;<br>                    &lt;form class="ui form padded"&gt;<br>                        &lt;div class="ui buttons two fluid"&gt;<br>                            &lt;div class="ui animated fluid large fade button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="github icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    Github<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                            &lt;div class="ui left floated animated fluid large fade basic button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="slack icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    Slack<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                        &lt;/div&gt;<br><br>                        &lt;div class="ui buttons two fluid"&gt;<br>                            &lt;div class="ui animated fluid large fade facebook button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="facebook icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    facebook<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                            &lt;div class="ui left floated animated fluid large fade twitter button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="twitter icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    twitter<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                        &lt;/div&gt;<br><br>                        &lt;div class="ui buttons two fluid"&gt;<br>                            &lt;div class="ui animated fluid large fade google plus button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="google plus icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    google plus<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                            &lt;div class="ui left floated animated fluid large fade youtube button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="youtube icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    youtube<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                        &lt;/div&gt;<br><br>                        &lt;div class="ui buttons two fluid"&gt;<br>                            &lt;div class="ui left floated animated fluid large fade vk button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="vk icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    vk<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                            &lt;div class="ui left floated animated fluid large fade linkedin button" tabindex="0"&gt;<br>                                &lt;div class="visible content"&gt;&lt;i class="linkedin icon"&gt;&lt;/i&gt;&lt;/div&gt;<br>                                &lt;div class="hidden content"&gt;<br>                                    linkedin<br>                                &lt;/div&gt;<br>                            &lt;/div&gt;<br>                        &lt;/div&gt;<br><br>                        &lt;div class="field"&gt;<br>                            &lt;div class="ui checkbox"&gt;<br>                                &lt;input type="checkbox" tabindex="0" class="hidden"&gt;<br>                                &lt;label&gt;I agree to the Terms and Conditions&lt;/label&gt;<br>                            &lt;/div&gt;<br>                        &lt;/div&gt;<br>                    &lt;/form&gt;<br>                &lt;/div&gt;<br>            &lt;/div&gt;<br>        &lt;/div&gt;<br>    &lt;/div&gt;<br>{{ end }}</pre>
<!-- /wp:preformatted -->

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

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package routes

import "github.com/gin-gonic/gin"

func PublicImages(route *gin.Engine)  {
   route.Static("/public/images", "./public/images")
}

func PublicCss(route *gin.Engine)  {
   route.Static("/public/css", "./public/css")
}
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Now include this route in router with the updated code as shown below</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">package router

import (
   "github.com/gin-gonic/gin"
   "hypi-app/routes"
   "hypi-app/views"
)

func Router() *gin.Engine  {

   router := gin.New()
   router.Use(gin.Logger())
   router.Use(gin.Recovery())



   <em>// System routes
   </em>routes.NotFound(router)
   routes.NoMethods(router)

   <strong><em>// Static Routes
   </em>routes.PublicCss(router)
   routes.PublicImages(router)</strong>

   <em>// Index view
   </em>views.IndexView(router)

   return router
}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>now let's add a style.css file in the css folder and add the following style.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"> h1, h2, h3, h4, h5, h6, p, a {<br>    font-family: 'Lato', sans-serif !important;<br>}<br>.core{<br>    height:100%;<br>}<br><br><br>.brand-bg-img{<br>    background: #2D52A3 url("../media/images/botecho_logo_size_invert.png") no-repeat;<br>    background-size: contain;<br>    background-position: left center;<br>}<br><br><br>.row-vh-f{<br>    height: 100vh;<br>}<br><br>.auth-bg{<br>    background-color: #FFFFFF;<br>}<br></pre>
<!-- /wp:preformatted -->

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