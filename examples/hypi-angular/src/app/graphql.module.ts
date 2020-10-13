import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://api.hypi.app/graphql/';
const tokenFromDeveloperHub = 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoiaHlwaS1kZW1vIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJhZG1pbkBoeXBpLmlvIiwiYXVkIjoiaHlwaS1kZW1vIiwiaWF0IjoxNjAyNTg1NTI2LCJleHAiOjE2MDUxNzc1MjYsInN1YiI6IjAxRU1HUkpTSjNLQVk2UldIQzRGMThFR1M4IiwibmJmIjoxNjAyNTg1NTI2fQ.cXekqf2xXM7zA5WqO2-JlU0jYrc2258Sc9KhDeo3n_odkAmNGteeOZHoHsv4-SX1eg2bV1u52naAlstazUMEWyi3KvBnxDfzS9SpwdQbCGwBs2o8M_8LPB08c0VSbh8fh0EmSjGledLiqqXtUTiy7aUoUJrHBID9kn3pB4LxvcrFl3M25fZOrfdhMxTY6R8Z36RyChJ3619iqoAV8MA-gFcwg5W-WIHT4sxNN8MXKnDeZAr7rRGhCpz6xUQ0Nv-1g84uh8WIVaLxG8XIt3LzHATA4fD7A6UsYNjNIa0A7yHjhp2t-lOL9e8OXyNs-Jl9OdJRM9MLslDfFS-H0y2Jnw';

export function provideApollo(httpLink: HttpLink): any {
  /* Get the authentication token from local storage if it exists or
   * generate one by login a user into their account or
   * the current one can be copied from the Developer Hub"
  */
  const token = localStorage.getItem('myToken') ? localStorage.getItem('myToken') : tokenFromDeveloperHub;
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `${token}`       ,
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

