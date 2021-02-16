import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';

@NgModule({
  declarations: [CategoryComponent],
  entryComponents:[],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe]
})
export class CategoryModule {
  constructor() {
    console.log('category-module loaded');
  }
}
