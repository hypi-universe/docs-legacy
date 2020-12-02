---
title: "OAuth2 Login"
metaTitle: "Hypi Platform OAuth2 Login Documentation"
metaDescription: "Hypi platform documentation for its OAuth2 login support"
---

## Overview

OAuth2 Authorization framework enables a third-party application to obtain limited access to an external Http service on
behalf of the resource owner by orchestrating an interaction between the resource owner and the Http service. On Hypi,
application developers can utilize OAuth2 functionality out of the box. Hypi supports a rich set of Http services
such as Facebook, Google, Github, Twitter, and more.  The following section explains how to integrate OAuth2 functionality
in your apps.

## How to setup and use OAuth2 Login?

* Register Developer Account
* Create OAuthProvider Object
* Retrieve Access Token

### Register Developer Account

External Http services enable developers to register applications on their platforms and then provide `ClientKey` and `ClientSecret`
that can be used at subsequent API requests. For example, for Google one can register an application on `https://console.developers.google.com/apis/credentials`.

### Create OAuthProvider Object

Once the `ClientKey` and `ClientSecret` have been obtained, then start by using GraphQL to integrate OAuth2 to your application on Hypi.

<div className={"code-container"}>

<div className={"code-column"}>

```graphql
mutation upsert($values:HypiUpsertInputUnion!) {
  upsert(values:$values){
    id
  }
}
```

</div>
</div>

Providing the following JSON payload for the GraphQL request under the `Variables` tab. Here is an example for Google OAuth2 configuration:

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  "values": {
    "OAuthProvider": {
      "clientId": "Your Client Key",
      "clientSecret": "Your Client Secret",
      "clientAuthenticationMethod": "basic",
      "authorizationGrantType": "authorization_code",
      "redirectUriTemplate": "{baseUrl}/login/oauth2/code/{registrationId}",
      "scopes": [
        "openid",
        "profile",
        "email",
        "address",
        "phone",
        "add more comma separated list of scopes"
      ],
      "authorizationUri": "https://accounts.google.com/o/oauth2/v2/auth",
      "tokenUri": "https://www.googleapis.com/oauth2/v4/token",
      "userInfoUri": "https://www.googleapis.com/oauth2/v3/userinfo",
      "userInfoAuthenticationMethod": "header",
      "userNameAttributeName": "sub",
      "jwkSetUri": "https://www.googleapis.com/oauth2/v3/certs",
      "configurationMetadata": [
        {
          "key": "foo",
          "value": "bar"
        },
        {
          "key": "baz",
          "value": "qux"
        }
      ],
      "clientName": "Google",
      "hypiSuccessRedirectUri": "https://yourHypiAppDomain.com/successfulLogin"
    }
  }
}

```

</div>
</div>

#### Enum Parameters

The following variables can take any value as long as it is described on the enum type in the core GraphQL schema on Hypi.

<div className={"code-container"}>

<div className={"code-column"}>

```graphql
enum UserNameAttributeName {
  iss
  sub
  aud
  exp
  iat
  auth_time
  nonce
  acr
  amr
  azp
  at_hash
  c_hash
}

enum AuthenticationMethod {
  header
  form
  query
}

enum AuthorizationGrantType {
  authorization_code
  implicit
  refresh_token
  client_credentials
}

enum ClientAuthenticationMethod {
  basic
  post
}
```

</div>
</div>

The definition of the above parameters can be found in the official standard specification of OAuth2 <a href="https://tools.ietf.org/html/rfc6749">Read more</a>

#### Provider Endpoints

The following parameters are specific to the external Http service.

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  "authorizationUri": "",
  "tokenUri": "",
  "userInfoUri": "",
  "jwkSetUri": ""
}
```

</div>
</div>

For Google, the values would be:

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  "authorizationUri": "https://accounts.google.com/o/oauth2/v2/auth",
  "tokenUri": "https://www.googleapis.com/oauth2/v4/token",
  "userInfoUri": "https://www.googleapis.com/oauth2/v3/userinfo",
  "jwkSetUri": "https://www.googleapis.com/oauth2/v3/certs"
}
```

</div>
</div>

For GitHub, the values would be:

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
    authorizationUri: https://github.com/login/oauth/authorize
    tokenUri: https://github.com/login/oauth/access_token
    userInfoUri: https://api.github.com/user
}
```

</div>
</div>

#### Redirection URIs

The `redirectUriTemplate` variable is reserved for Hypi in order to handle the callback response from the external Http
service. It is always set to as follows:

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  "redirectUriTemplate": "{baseUrl}/login/oauth2/code/{registrationId}"
}
```

</div>
</div>

Then provide the redirection Uri that the enduser should land on after the OAuth2 flow is complete. The value must represent
a valid Http formatted Uri that exists on your Hypi app domain.

<div className={"code-container"}>

<div className={"code-column"}>

```json
{
  ""hypiSuccessRedirectUri": "https://yourHypiAppDomain.com/successfulLogin"
}
```

</div>
</div>

Hypi will add a query parameter `token` to the redirectUri that can be used to communicate with Hypi Platform representing
the resource owner who has completed the authorization process.

### Retrieve Access Token

Hypi stores the `accessToken` and the `refreshToken` and they can be found on the GraphQL type `OAuth2AuthorizedClient`.

<div className={"code-container"}>

<div className={"code-column"}>

```graphql
type OAuth2AuthorizedClient {
  clientRegistrationId: String
  principalName: String
  accessToken: String
  refreshToken: String
}
```

</div>
</div>
