import React from "react"
import PropTypes from "prop-types"
import config from "../config";


export default class HTML extends React.Component {

  render() {

    return (
      <html {...this.props.htmlAttributes}>
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {config.siteMetadata.ogImage ?
          (<meta property="og:image" content={config.siteMetadata.ogImage}/>) : null
        }
        <meta property="twitter:card" content="summary_large_image"/>
        {config.siteMetadata.ogImage ?
          (<meta property="twitter:image" content={config.siteMetadata.ogImage}/>) : null
        }
        {config.siteMetadata.favicon ?
          (<link rel="shortcut icon" type="image/svg" href={config.siteMetadata.favicon}/>) : null
        }
        {/*<link rel="stylesheet"*/}
        {/*href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"*/}
        {/*integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />*/}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"/>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossOrigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
        <script
        dangerouslySetInnerHTML={{
          __html: `
            <!-- Google Tag Manager -->
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVVGXD5');
            <!-- End Google Tag Manager -->
            `
        }}
      />
        {this.props.headComponents}
      </head>
      <body {...this.props.bodyAttributes}>
      {this.props.preBodyComponents}
      <div
        key={`body`}
        id="___gatsby"
        dangerouslySetInnerHTML={{__html: this.props.body}}
      />
      {this.props.postBodyComponents}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            $(document).on('click','.navbar-collapse.in',function(e) {
              if( $(e.target).is('a') ) {
                $(this).collapse('hide');
              }
            });
            `
        }}
      />
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            $(document).ready(function(){
              console.log('Ready event')
              setTimeout(function(){
                docsearch({
                  apiKey: '9ae9d65b23569334296974ce321050b6',
                  indexName: 'hypi',
                  inputSelector: '#search-inp',
                  debug: false // Set debug to true if you want to inspect the dropdown
                });
              }, 500);
            })

             <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVVGXD5"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
            `
        }}
      />
      </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
