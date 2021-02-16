import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent, CategoryAddComponent, CategoryListComponent],
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
