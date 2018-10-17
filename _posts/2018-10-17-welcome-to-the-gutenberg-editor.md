---
ID: 502
post_title: Welcome to the Gutenberg Editor
author: zcourts
post_excerpt: ""
layout: post
permalink: >
  https://beta.hypi.io/blog/solutions/welcome-to-the-gutenberg-editor/
published: true
post_date: 2018-10-17 05:39:08
---
<!-- wp:cover-image {"url":"https://cldup.com/Fz-ASbo2s3.jpg","align":"wide"} -->

<div class="wp-block-cover-image has-background-dim alignwide" style="background-image:url(https://cldup.com/Fz-ASbo2s3.jpg)">
  <p class="wp-block-cover-image-text">
    Of Mountains & Printing Presses
  </p>
</div>

<!-- /wp:cover-image -->

<!-- wp:paragraph -->

The goal of this new editor is to make adding rich content to WordPress simple and enjoyable. This whole post is composed of *pieces of content*—somewhat similar to LEGO bricks—that you can move around and interact with. Move your cursor around and you’ll notice the different blocks light up with outlines and arrows. Press the arrows to reposition blocks quickly, without fearing about losing things in the process of copying and pasting.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

What you are reading now is a **text block** the most basic block of all. The text block has its own controls to be moved freely around the post...

<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"right"} -->

<p style="text-align:right">
  ... like this one, which is right aligned.
</p>

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Headings are separate blocks as well, which helps with the outline and organization of your content.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## A Picture is Worth a Thousand Words

<!-- /wp:heading -->

<!-- wp:paragraph -->

Handling images and media with the utmost care is a primary focus of the new editor. Hopefully, you’ll find aspects of adding captions or going full-width with your pictures much easier and robust than before.

<!-- /wp:paragraph -->

<!-- wp:image {"align":"center"} -->

<div class="wp-block-image">
  <figure class="aligncenter"><img src="https://cldup.com/cXyG__fTLN.jpg" alt="Beautiful landscape" /><figcaption>If your theme supports it, you’ll see the "wide" button on the image toolbar. Give it a try.</figcaption></figure>
</div>

<!-- /wp:image -->

<!-- wp:paragraph -->

Try selecting and removing or editing the caption, now you don’t have to be careful about selecting the image or other text by mistake and ruining the presentation.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## The *Inserter* Tool

<!-- /wp:heading -->

<!-- wp:paragraph -->

Imagine everything that WordPress can do is available to you quickly and in the same place on the interface. No need to figure out HTML tags, classes, or remember complicated shortcode syntax. That’s the spirit behind the inserter—the `(+)` button you’ll see around the editor—which allows you to browse all available content blocks and add them into your post. Plugins and themes are able to register their own, opening up all sort of possibilities for rich editing and publishing.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Go give it a try, you may discover things WordPress can already add into your posts that you didn’t know about. Here’s a short list of what you can currently find there:

<!-- /wp:paragraph -->

<!-- wp:list -->

*   Text & Headings
*   Images & Videos
*   Galleries
*   Embeds, like YouTube, Tweets, or other WordPress posts.
*   Layout blocks, like Buttons, Hero Images, Separators, etc.
*   And *Lists* like this one of course :)

<!-- /wp:list -->

<!-- wp:separator -->

<hr class="wp-block-separator" />

<!-- /wp:separator -->

<!-- wp:heading -->

## Visual Editing

<!-- /wp:heading -->

<!-- wp:paragraph -->

A huge benefit of blocks is that you can edit them in place and manipulate your content directly. Instead of having fields for editing things like the source of a quote, or the text of a button, you can directly change the content. Try editing the following quote:

<!-- /wp:paragraph -->

<!-- wp:quote -->

<blockquote class="wp-block-quote">
  <p>
    The editor will endeavor to create a new page and post building experience that makes writing rich posts effortless, and has “blocks” to make it easy what today might take shortcodes, custom HTML, or “mystery meat” embed discovery.
  </p>
  
  <cite>Matt Mullenweg, 2017</cite>
</blockquote>

<!-- /wp:quote -->

<!-- wp:paragraph -->

The information corresponding to the source of the quote is a separate text field, similar to captions under images, so the structure of the quote is protected even if you select, modify, or remove the source. It’s always easy to add it back.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Blocks can be anything you need. For instance, you may want to add a subdued quote as part of the composition of your text, or you may prefer to display a giant stylized one. All of these options are available in the inserter.

<!-- /wp:paragraph -->

<!-- wp:gallery {"columns":2} -->

<ul class="wp-block-gallery columns-2 is-cropped">
  <li class="blocks-gallery-item">
    <figure><img src="https://cldup.com/n0g6ME5VKC.jpg" alt="" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://cldup.com/ZjESfxPI3R.jpg" alt="" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://cldup.com/EKNF8xD2UM.jpg" alt="" /></figure>
  </li>
</ul>

<!-- /wp:gallery -->

<!-- wp:paragraph -->

You can change the amount of columns in your galleries by dragging a slider in the block inspector in the sidebar.

<!-- /wp:paragraph -->

<!-- wp:heading -->

## Media Rich

<!-- /wp:heading -->

<!-- wp:paragraph -->

If you combine the new **wide** and **full-wide** alignments with galleries, you can create a very media rich layout, very quickly:

<!-- /wp:paragraph -->

<!-- wp:image {"align":"full"} --><figure class="wp-block-image alignfull">

![Accessibility is important — don’t forget image alt attribute][1]</figure> <!-- /wp:image -->

<!-- wp:paragraph -->

Sure, the full-wide image can be pretty big. But sometimes the image is worth it.

<!-- /wp:paragraph -->

<!-- wp:gallery {"align":"wide"} -->

<ul class="wp-block-gallery alignwide columns-2 is-cropped">
  <li class="blocks-gallery-item">
    <figure><img src="https://cldup.com/_rSwtEeDGD.jpg" alt="" /></figure>
  </li>
  <li class="blocks-gallery-item">
    <figure><img src="https://cldup.com/L-cC3qX2DN.jpg" alt="" /></figure>
  </li>
</ul>

<!-- /wp:gallery -->

<!-- wp:paragraph -->

The above is a gallery with just two images. It’s an easier way to create visually appealing layouts, without having to deal with floats. You can also easily convert the gallery back to individual images again, by using the block switcher.

<!-- /wp:paragraph -->

<!-- wp:paragraph -->

Any block can opt into these alignments. The embed block has them also, and is responsive out of the box:

<!-- /wp:paragraph -->

<!-- wp:core-embed/vimeo {"url":"https://vimeo.com/22439234","type":"video","providerNameSlug":"vimeo","align":"wide","className":"wp-has-aspect-ratio wp-embed-aspect-16-9"} --><figure class="wp-block-embed-vimeo alignwide wp-block-embed is-type-video is-provider-vimeo wp-has-aspect-ratio wp-embed-aspect-16-9">

<div class="wp-block-embed__wrapper">
  https://vimeo.com/22439234
</div></figure> 

<!-- /wp:core-embed/vimeo -->

<!-- wp:paragraph -->

You can build any block you like, static or dynamic, decorative or plain. Here’s a pullquote block:

<!-- /wp:paragraph -->

<!-- wp:pullquote --><figure class="wp-block-pullquote">

> Code is Poetry
> 
> <cite>The WordPress community</cite></figure> <!-- /wp:pullquote -->

<!-- wp:paragraph {"align":"center"} -->

<p style="text-align:center">
  <em> If you want to learn more about how to build additional blocks, or if you are interested in helping with the project, head over to the <a href="%s">GitHub repository</a>. </em>
</p>

<!-- /wp:paragraph -->

<!-- wp:button {"align":"center"} -->

<div class="wp-block-button aligncenter">
  <a class="wp-block-button__link" href="https://github.com/WordPress/gutenberg">Help build Gutenberg</a>
</div>

<!-- /wp:button -->

<!-- wp:separator -->

<hr class="wp-block-separator" />

<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center"} -->

<p style="text-align:center">
  Thanks for testing Gutenberg!
</p>

<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center"} -->

<p style="text-align:center">
  <img draggable="false" class="emoji" alt="👋" src="https://s.w.org/images/core/emoji/2.3/svg/1f44b.svg" />
</p>

<!-- /wp:paragraph -->

 [1]: https://cldup.com/8lhI-gKnI2.jpg