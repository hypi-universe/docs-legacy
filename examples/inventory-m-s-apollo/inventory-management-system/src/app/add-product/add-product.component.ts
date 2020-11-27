import { Component, OnInit } from '@angular/core';
import {RequestsService} from '../requests.services';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const AddProduct = gql`
mutation Upsert($values: HypiUpsertInputUnion!){
  upsert(values: $values){
    id
  } }`;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  code: string;
  name: string;
  total: string;
  remaining: string;
  comments: string;
  price: number;

  constructor(private req: RequestsService, private apollo: Apollo) {

  }

  ngOnInit(): void {

  }
  addProduct(): void {
    this.apollo.mutate({
      mutation: AddProduct,
      variables: {
        values: {
          Product: [
            {
              name: this.name,
              hypi: {id: this.code},
              price: this.price,
              total: this.total,
              remaining: this.total,
              comments: this.comments
            }
          ]
        }
      }
    }).pipe(map(data => {
      console.log(data);
    })).subscribe(result => {
    });
  }


  addProductV1(): void {

     var values: string;
     var domain: string;

     // payload to send to Hypi
     values = JSON.stringify({
     variables: {
     value: {
     hypi: {id: this.code}, name: this.name,
     total: this.total, price: this.price, comments: this.comments, remaining: this.total
     }
     },
     query: 'mutation {upsert(values: {Product: [{hypi: {id: "' + this.code + '" } ' + 'name: "' + this.name + '" total: '+ this.total+' price: '+this.price+' ' + 'comments: "'+this.comments+'" remaining: '+this.total+'}]}){id}} ' });

     // domain of our new release in Hypi
     domain = 'product-01.com';

     // using req object to call its postRequest()
     this.req.postRequest(domain, values);
  }


}
