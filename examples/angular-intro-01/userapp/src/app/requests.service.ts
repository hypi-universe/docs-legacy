import {Injectable} from '@angular/core';
import {HttpResponse, HttpHeaders, ɵangular_packages_common_http_http_a, HttpParams} from '@angular/common/http';
import {Observable, of, from } from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class RequestsService {

  user: string;
  pass: string;
  constructor(private http: HttpClient,
              private router: Router) {
  }
  postRequest() {
      var values: string;
      const headers = new HttpHeaders()
      .set('hypi-domain', 'users07-hypi.com')
      .set('Authorization', 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoiYXllc2hhIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJheWVzaGE5MDA5QGdtYWlsLmNvbSIsImF1ZCI6ImF5ZXNoYSIsImlhdCI6MTYwMDkyMDY3NSwiZXhwIjoxNjAzNTEyNjc1LCJzdWIiOiIwMUVKR0VFREpUS1haMzhKMEo1RUQ5V1BNUiIsIm5iZiI6MTYwMDkyMDY3NX0.WxuWUK3-eCmHLmSibDQs441Yt-L6PW0Z3uQj4UOr49iLIVW0flBfAViPqqK1XZTAQCGpcbOCSazKwDmlotnyhTcoWhsbjOF9UbTtOvTJwr0WPwkKsrwLFXFMAAgyuWtaAkfhIDtWRM8OPHnY_MDQHCyfB5n-8YhtZWBkWn-WGPfXu9CCpJ-bE-fZ-tGSICmLjPCfxO4mGRC5bILc9C0C9lJ-wivA6Uo64ICLmEjn4dvX6et5OoniyYDVS9wYwCyJqQUh61oZRhY2hpPwwlQYp37D0Ek0HN4q4LJKkTL80qxvxL4XeO6kXHGO7L-W3xM_mI7IjlGHe_4jtchu2QPYXg')  .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

      // values = JSON.stringify({value: { username: 'adam', password: {value: 'secret12'}} });
      // to create an account
    //  values = JSON.stringify( {operationName: 'upsert', variables: {value:
   //     { username: 'adam', password:
  //        {value: 'secret12'}} }, query: 'mutation upsert($value: AccountInput!) { createAccount(value: $value) {id}}' });
      // to find an account



     // values = JSON.stringify( {operationName: 'findAccount', query: 'query findAccount($arcql: String!){\n find (type: Account, arcql: $arcql){\n edges{\n node{\n ... on Account {\n username\n password{value} \n emails{value}\n }} cursor} pageInfo{hasPreviousPage \n hasNextPage \n startCursor \n endCursor \n pageLimit \n previousOffsets \n nextOffsets} } }', variables: {'arcql': "hypi.id='01EJGEEDJTKXZ38J0J5ED9WPMR'"} });
      values = JSON.stringify( {operationName: 'findAccount', query: 'query findAccount($arcql: String!){\n find (type: Account, arcql: $arcql){\n edges{\n node{\n ... on Account {\n username\n password{value} \n emails{value}\n }} cursor} pageInfo{hasPreviousPage \n hasNextPage \n startCursor \n endCursor \n pageLimit \n previousOffsets \n nextOffsets} } }', variables: {'arcql': "username='adam'"} });
      console.log(values);
      this.http.post('https://api.hypi.app/graphql', values , {headers})
      .pipe(map(data => { console.log(data); })).subscribe(result => {

    });

  }




}
