import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubCategoryAddComponent } from './sub-category-add/sub-category-add.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category.component';



@NgModule({
  declarations: [SubCategoryComponent, SubCategoryListComponent, SubCategoryAddComponent ],
 
  entryComponents: [
  ], 
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe]
})
export class SubCategoryModule {
  constructor() {
    console.log('SubCategory-module loaded');
  }
}
