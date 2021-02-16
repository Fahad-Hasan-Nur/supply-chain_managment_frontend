import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand.component';
const routes: Routes = [
  {
    path: '',
    component: BrandComponent,

    children: [
      {
      path:  URL_NAME.BRAND_ADD,
      component:  BrandAddComponent,
      data: {
        title: MENU_NAME.BRAND_ADD
      },
      },
      {
      path:  URL_NAME.BRAND_LIST,
      component:  BrandListComponent,
      data: {
        title: MENU_NAME.BRAND_LIST
      },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
