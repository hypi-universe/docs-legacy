import { Component } from '@angular/core';
import {RequestsService} from './requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userapp';
  constructor(private requestService: RequestsService){

  }

  ngOnInit() {
  this.requestService.postRequest();

  }
}
