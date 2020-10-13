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
