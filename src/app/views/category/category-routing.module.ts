import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant'
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category.component';
const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: URL_NAME.CATEGORY_ADD,
        component: CategoryAddComponent,
        data: {
          title: MENU_NAME.CATEGORY_ADD,
        },
      },
      {
        path: URL_NAME.CATEGORY_LIST,
        component: CategoryListComponent,
        data: {
          title: MENU_NAME.CATEGORY_LIST,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
