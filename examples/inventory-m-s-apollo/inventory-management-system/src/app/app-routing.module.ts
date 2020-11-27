import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProductComponent} from "./add-product/add-product.component";
import {ViewProductsComponent} from "./view-products/view-products.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {HomeComponent} from "src/app/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: 'edit-product',
    component: EditProductComponent
  },
  {
    path: 'view-stock',
    component: ViewProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
