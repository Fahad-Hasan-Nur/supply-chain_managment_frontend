import { SUB_CATEGORY_API } from './../../common/constant/api.constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryAddComponent } from './sub-category-add/sub-category-add.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
const routes: Routes = [
  {
    path: '',
    component: SubCategoryComponent,

    children: [
      {
      path:  URL_NAME.SUB_CATEGORY_ADD,
      component:  SubCategoryAddComponent,
      data: {
        title: MENU_NAME.SUB_CATEGORY_ADD
      },
      },
      {
      path:  URL_NAME.SUB_CATEGORY_LIST,
      component:  SubCategoryListComponent,
      data: {
        title: MENU_NAME.SUB_CATEGORY_LIST
      },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
