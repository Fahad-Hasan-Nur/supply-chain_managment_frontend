import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
  path:  URL_NAME.CATEGORY,
      component:  CategoryComponent,
      data: {
        title: MENU_NAME.CATEGORY,
      },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }
