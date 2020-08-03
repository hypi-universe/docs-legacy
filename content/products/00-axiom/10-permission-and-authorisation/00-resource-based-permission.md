---
title: "Resource Based Permission Permission"
metaTitle: "Hypi Platform Resource Based Permission Documentation"
metaDescription: "Hypi platform documentation for resource based permission"
---

## Overview
Allows protecting a specific resource by ID. The owner of the resource can give permission for other users to access the resource and also can give permission for other users to modify permissions of the resource.

## Examples
For the examples below we will need some data. Use add these entries to be able to get the results shown in the example.

### Creating a Resource Based Permission

1. `Creating a RBP with a role policy`

    <div className={"code-container"}>

    <div className={"code-column"}>

    ```
    #GraphQL query
    mutation Upsert($values: HypiUpsertInputUnion!) {
      upsert(values: $values) {
        release
        instance
        publisherRelease
        id
        created
        app
        impl
        updated
        publisherRealm
        trashed
        publisherApp
        instanceId
        __typename
    }
    #Data
    {
      "values": {
        ResourceBasedPermission: [
            [
              "hypi"          : ["id": "rbp2"],
              name            : 'rbp2',
              decisionStrategy: 'Unanimous',
              type            : 'URL',
              resource        : 'url123',
              policies        : [
                [
                  hypi : [impl: 'RolePolicy', id: 'rp1'],
                  name : 'rp 1',
                  logic: 'Positive',
                  roles: [
                    [
                      hypi    : [id: 'r1'],
                      name    : 'role 1',
                      accounts: [
                        [hypi: [id: accId1]]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
      }
    }
    ```
    </div>
    <div className={"code-column"}>

    ```json
    {
      "data": {
        "upsert": [
          {
            "release": "latest",
            "instance": "hypi",
            "publisherRelease": "latest",
            "id": "rbp2",
            "created": "2020-08-03T10:01:06Z",
            "app": "store",
            "impl": null,
            "updated": "2020-08-03T10:01:06Z",
            "publisherRealm": "hypi",
            "trashed": null,
            "publisherApp": "core",
            "instanceId": "01E8TQXPF01QR7QYFZA038DM2P",
            "__typename": "Hypi"
          }
        ]
      }
    }
    ```
    </div>

    </div>

1. `Creating a RBP with a group policy`

    <div className={"code-container"}>

    <div className={"code-column"}>

    ```
    #GraphQL query
    mutation Upsert($values: HypiUpsertInputUnion!) {
      upsert(values: $values) {
        release
        instance
        publisherRelease
        id
        created
        app
        impl
        updated
        publisherRealm
        trashed
        publisherApp
        instanceId
        __typename
    }
    #Data
    {
      "values": {
        ResourceBasedPermission: [
            [
              "hypi"          : ["id": "rbp2"],
              name            : 'rbp2',
              decisionStrategy: 'Unanimous',
              type            : 'URL',
              resource        : 'url123',
              policies        : [
                [
                  hypi  : [impl: 'GroupPolicy', id: 'gp1'],
                  name  : 'gp 1',
                  logic : 'Positive',
                  groups: [
                    [
                      hypi    : [id: 'g1'],
                      name    : 'group 1',
                      accounts: [
                        [hypi: [id: accId1]]
                      ]
                    ]
                  ],
                  organisations: [
                    [
                      hypi   : [id: 'o1'],
                      name   : 'Org 1',
                      members: [
                        [hypi: [id: accId1]]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
      }
    }
    ```
    </div>
    <div className={"code-column"}>

    ```json
    {
      "data": {
        "upsert": [
          {
            "release": "latest",
            "instance": "hypi",
            "publisherRelease": "latest",
            "id": "rbp2",
            "created": "2020-08-03T10:01:06Z",
            "app": "store",
            "impl": null,
            "updated": "2020-08-03T10:01:06Z",
            "publisherRealm": "hypi",
            "trashed": null,
            "publisherApp": "core",
            "instanceId": "01E8TQXPF01QR7QYFZA038DM2P",
            "__typename": "Hypi"
          }
        ]
      }
    }
    ```
    </div>

    </div>

1. `Creating a RBP with a role policy`

    <div className={"code-container"}>

    <div className={"code-column"}>

    ```
    #GraphQL query
    mutation Upsert($values: HypiUpsertInputUnion!) {
      upsert(values: $values) {
        release
        instance
        publisherRelease
        id
        created
        app
        impl
        updated
        publisherRealm
        trashed
        publisherApp
        instanceId
        __typename
    }
    #Data
    {
      "values": {
        ResourceBasedPermission: [
            [
              "hypi"          : ["id": "rbp2"],
              name            : 'rbp2',
              decisionStrategy: 'Unanimous',
              type            : 'URL',
              resource        : 'url123',
              policies        : [
                [
                  hypi  : [impl: 'RealmPolicy', id: 'rp2'],
                  name  : 'rp 2',
                  logic : 'Positive',
                  realms: [
                    [
                      hypi    : [id: 'rl1'],
                      name    : 'hypi',
                      accounts: [
                        [
                          "hypi"    : ["id": "example.user1"],
                          "username": "user1",
                          "password": ["value": "pass1"],
                          "emails"  : [["value": "user1@hypi.io"]],
                          "owner"   : ["names": [
                            ["firstName": "Something"]
                          ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
      }
    }
    ```
    </div>
    <div className={"code-column"}>

    ```json
    {
      "data": {
        "upsert": [
          {
            "release": "latest",
            "instance": "hypi",
            "publisherRelease": "latest",
            "id": "rbp2",
            "created": "2020-08-03T10:01:06Z",
            "app": "store",
            "impl": null,
            "updated": "2020-08-03T10:01:06Z",
            "publisherRealm": "hypi",
            "trashed": null,
            "publisherApp": "core",
            "instanceId": "01E8TQXPF01QR7QYFZA038DM2P",
            "__typename": "Hypi"
          }
        ]
      }
    }
    ```
    </div>

    </div>

1. `Creating a RBP with a time policy`

    <div className={"code-container"}>

    <div className={"code-column"}>

    ```
    #GraphQL query
    mutation Upsert($values: HypiUpsertInputUnion!) {
      upsert(values: $values) {
        release
        instance
        publisherRelease
        id
        created
        app
        impl
        updated
        publisherRealm
        trashed
        publisherApp
        instanceId
        __typename
    }
    #Data
    {
      "values": {
        ResourceBasedPermission: [
            [
              "hypi"          : ["id": "rbp2"],
              name            : 'rbp2',
              decisionStrategy: 'Unanimous',
              type            : 'URL',
              resource        : 'url123',
              policies        : [
                [
                  hypi   : [impl: 'TimePolicy', id: 'tp1'],
                  name   : 'time policy 1',
                  from   : '2020-04-03 11:13:34',
                  to     : SqlHelper.timestamp(DateTime.now().plusDays(1)),
                  logic  : 'Positive',
                  groups: [
                    [
                      hypi    : [id: 'g1'],
                      name    : 'group 1',
                      accounts: [
                        [hypi: [id: accId1]]
                      ]
                    ]
                  ],
                  roles: [
                    [
                      hypi    : [id: 'r1'],
                      name    : 'role 1',
                      accounts: [
                        [hypi: [id: accId2]]
                      ]
                    ]
                  ],
                  accounts: [
                    [hypi: [id: accId3]]
                  ]
                ]
              ]
            ]
          ]
      }
    }
    ```
    </div>
    <div className={"code-column"}>

    ```json
    {
      "data": {
        "upsert": [
          {
            "release": "latest",
            "instance": "hypi",
            "publisherRelease": "latest",
            "id": "rbp2",
            "created": "2020-08-03T10:01:06Z",
            "app": "store",
            "impl": null,
            "updated": "2020-08-03T10:01:06Z",
            "publisherRealm": "hypi",
            "trashed": null,
            "publisherApp": "core",
            "instanceId": "01E8TQXPF01QR7QYFZA038DM2P",
            "__typename": "Hypi"
          }
        ]
      }
    }
    ```
    </div>

    </div>

