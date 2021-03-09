import { SubCategory } from './../../common/model/sub-category';
import { LoaderComponent } from './../sub-category/loader.component';
import { SubCategoryViewComponent } from './dialog/sub-category-view/sub-category-view.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubCategoryAddComponent } from './sub-category-add/sub-category-add.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryEditComponent } from './dialog/sub-category-edit/sub-category-edit.component';



@NgModule({
  declarations: [SubCategoryComponent, SubCategoryListComponent, SubCategoryAddComponent ,SubCategoryViewComponent,LoaderComponent, SubCategoryEditComponent],
 
  entryComponents: [SubCategoryViewComponent,SubCategoryEditComponent
  ], 
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,SubCategory]
})
export class SubCategoryModule {
  constructor() {
    console.log('SubCategory-module loaded');
  }
}
