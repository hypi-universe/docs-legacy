import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../requests.services';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  code: string;
  name: string;
  total: string;
  remaining: string;
  comments: string;
  price: number;
  constructor(private req: RequestsService) { }

  ngOnInit(): void {
  }

  editProduct(){
    var values: string;
    var domain: string;
    values = JSON.stringify({
      variables: {
        value: {
          hypi: {id: this.code}, name: this.name,
          total: this.total, price: this.price, comments: this.comments, remaining: this.total
        }
      },
      query: 'mutation {upsert(values: {Product: [{hypi: {id: "'+this.code+'"} name: "'+this.name+'" total: '+this.total+' price: '+this.price+' comments: "'+this.comments+'" remaining: '+this.remaining+'}]}){id}} ' });

    domain = 'product-01.com';
    this.req.postRequest(domain,values);
  }
}
