import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { DemoMaterialModule } from '../../material.module';
import {  ProductListComponent } from './product-list/product-list.component';
import {  ProductAddComponent } from './product-add/product-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { QuillEditorComponent } from '../../common/component/editor/quill-editor.component';
import { LoaderComponent } from './loader.component';
import { Product } from '../../common/model/product';
import { ProductViewComponent } from './component/product-view/product-view.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductAddComponent,QuillEditorComponent,LoaderComponent, ProductViewComponent,],
 
  entryComponents: [
    ProductViewComponent,
  ], 
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [DatePipe,Product]
})
export class ProductModule {
  constructor() {
    console.log('product-module loaded');
  }
}
