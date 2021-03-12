import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Product } from '../../common/model/product';
import { DemoMaterialModule } from '../../material.module';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { LoaderComponent } from './loader.component';
import {  ProductAddComponent } from './product-add/product-add.component';
import {  ProductListComponent } from './product-list/product-list.component';
import {  ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAddComponent,
    LoaderComponent ,
    ProductViewComponent ,
    ProductEditComponent ,
    ProductEditComponent ,
  ],

  entryComponents: [
    ProductViewComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  providers: [DatePipe, Product],
})
export class ProductModule {
  constructor() {
    console.log('product-module loaded');
  }
}
