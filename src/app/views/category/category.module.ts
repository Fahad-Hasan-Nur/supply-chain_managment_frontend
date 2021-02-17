import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../common/model/Category';
import { DemoMaterialModule } from '../../material.module';
import { LoaderComponent } from '../category/loader.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryViewComponent } from './category-list/dialog/category-view/category-view.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent, CategoryAddComponent, CategoryListComponent,LoaderComponent,CategoryViewComponent],
  entryComponents:[CategoryViewComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,Category]
})
export class CategoryModule {
  constructor() {
    console.log('category-module loaded');
  }
}
