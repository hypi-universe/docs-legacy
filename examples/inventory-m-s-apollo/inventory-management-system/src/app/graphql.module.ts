import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpHeaders} from '@angular/common/http';

const uri = 'https://api.hypi.app/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri, headers: new HttpHeaders().set('hypi-domain', 'product-01.com')
      .set('Authorization', 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoiYXllc2hhIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJheWVzaGE5MDA5QGdtYWlsLmNvbSIsImF1ZCI6ImF5ZXNoYSIsImlhdCI6MTYwNjM5MTk5OSwiZXhwIjoxNjA4OTgzOTk5LCJzdWIiOiIwMUVKR0VFREpUS1haMzhKMEo1RUQ5V1BNUiIsIm5iZiI6MTYwNjM5MTk5OX0.FpRTp1KDgtuRtpxkU2Yzydatw-JCIaQgiJODZYXzrmX53Jgtjys2oSGs8MEh9zOVkv0GY6MvBCNHzzCskjqP6nPNtnutQYDe_oGRKxE1cEJF1E0IbWPQ60GFVyO_S9NpzTwilV7sU6mXfWRurvTQAzya4-8y8ousRmfWnWyVRbjKBmZITXC5sRWAU2Em7-dmxzCHRV2mJG-U5Yl1rHGcFJHnTyzjKabvo68LCJ3TWwU31ZejazsjEeMspp6Og9bRXLq-dlpJS6mtnzmMyC26BykNh0_hdcxMZNv1EQDgWwQeW6IJrgoflLcqVHvOpnxcj0YqqA5Xpyz_VtgSu2WBLA')
      .set('Content-Type', 'application/json').set('Accept', 'application/json')}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
