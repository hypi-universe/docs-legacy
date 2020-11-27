import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";


@Injectable()
export class RequestsService {

  constructor(private http: HttpClient, private router: Router) {
  }

  postRequest(domain: string, payload: string): any {

    const headers = new HttpHeaders()
      .set('hypi-domain', domain)
      .set('Authorization', 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoiYXllc2hhIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJheWVzaGE5MDA5QGdtYWlsLmNvbSIsImF1ZCI6ImF5ZXNoYSIsImlhdCI6MTYwMzY5MTk4MCwiZXhwIjoxNjA2MjgzOTgwLCJzdWIiOiIwMUVKR0VFREpUS1haMzhKMEo1RUQ5V1BNUiIsIm5iZiI6MTYwMzY5MTk4MH0.p5EilLvriZAQjdwE1CH5wznqLHwww6tPz1F0NWkQgqBIRlj1OBBL3R77VhthhkQlqQmg41qbfroDf01C6VJ0kd7Wq7L8NJA8l4uGL24UgxvGaZgTGZ2CFaqcBDd0TPwbqBxW0-JXgm_1K4Lqg9Ww3m57O1zFnKVFYbTAump9qdksolar_-jUFgaAWvJ2BtSJ-AecJze9HXIdwYLqEblYE3utt9qjnzZX3WLuZAbP0UcqitdQ8YXsq8cJaDcuAHYEvBKtGzjrvRDNAGLkCqtvtlKxIciJt3vX5Ptc9ZpcyUfqF_Pe4vOygRPVDd_ngSwlP6v85_Ufpxnz0LDpU9bbug').set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    this.http.post('https://api.hypi.app/graphql', payload , {headers})
      .pipe(map(data => {
        console.log(data);

      })).subscribe(result => {

    });
  }





}
