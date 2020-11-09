---
title: "File upload API"
metaTitle: "Hypi Platform Documentation for its File upload API"
metaDescription: "Hypi platform documentation demonstrating how to upload files to the Hypi platform"
---
## Overview

Many applications require the ability to accept file uploads. Hypi makes it easy to support this in your applications by providing a simple API to do so.
Hypi's core app includes a type definition called `File`. When files are uploaded, an object of this type is created which can later by queried via REST or GraphQL.
The definition includes meta data about the file, including its file, media type (if it could be determined), the URL to download it and more.

## GraphQL File definition

The file object definition captures various information about the file uploaded.
```graphql
type File {
  name: String!
  directory: String!
  path: String!
  isDirectory: Boolean!
  status: FileStatus
  url: URL
  children: [File!]
  #media type
  type: String
  size: Long
  extension: String
  isStared: Boolean
  isSharable: Boolean
  content: String
}
```

## Upload endpoint
To upload a file (any file can be uploaded, image, pdf, etc), use the following endpoint

`POST /upload/**`

Note the `**`, if you use a path like `/upload/my/path`, then the `File` object will have a directory value of `/my/path`.
1. The `type` field will be populated with the media type e.g. `text/plain` if it could be determined.
2. The `size` will be set to the size of the file in bytes.
3. The `status` will be set to `UPLOADED` on success
4. The `name` will be set to the original file name e.g. `my-file.txt`
5. The `url` will be set and has a `path` that gives the URL you should use to later download the file.

## Download endpoint

`GET /file/<path>.ext`

To download a file uploaded to the platform, the above URL pattern should be used.

The `<path>` is by default the `ID` of the `File` object.
The `.ext` is the original extension of the file e.g. `.txt`.

## curl upload example

```shell script
auth='<hypi-auth-token>'
curl -v https://api.hypi.app/upload/ -H "Accept: application/json" -H "Authorization: $auth" -H 'hypi-domain: <instance-domain>' -F 0=@/path/to/file.txt
```

1. The response of the upload is JSON
2. The `Authorization` header is required
3. The `hypi-domain` header is required (like other API requests)

## curl download example
```shell script
curl -v https://api.hypi.app/file/<id>.ext -H "Authorization: $auth"
```

In this example we provide an authorisation token. This is because files are private to the account which created it by default.
To give access to other users or allow anonymous download a permission must be created with appropriate policies.

For example, to give the anonymous users access (no token required), use an `AccountPolicy` to grant the `anonymous` user account read access.
```graphql
mutation {
  upsert(
    values: {
      Permission: [
        {
          name: "Grant access to anonymous user"
          decisionStrategy: Unanimous
          type: "File"
          resource: "<file-id>"
          scopes: ["*"]
          operationType: Query
          operations: ["find"]
          #includeAllAccounts: true, //wildcard so all accounts can access
          policies: [
            {
              hypi: { impl: "AccountPolicy" }
              name: "Grant user anonymous access to my file"
              logic: Positive
              accounts: [{ hypi: { id: "anonymous" } }]
            }
          ]
        }
      ]
    }
  ) {
    id
  }
}
```
In this example we explicitly give anonymous users access to the file uploaded.
This could also have been done by giving access to *all* accounts in the app instance by setting `includeAllAccounts` to true.

```shell script
curl -v https://api.hypi.app/file/<id>.ext
```

Due to the permission above, the curl request can now be made without any authorisation headers.
