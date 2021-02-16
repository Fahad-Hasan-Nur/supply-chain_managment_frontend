import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';
const routes: Routes = [
  {
    path: '',
    component: ProductComponent,

    children: [
      {
      path:  URL_NAME.PRODUCT_ADD,
      component:  ProductAddComponent,
      data: {
        title: MENU_NAME.PRODUCT_ADD
      },
      },
      {
      path:  URL_NAME.PRODUCT_LIST,
      component:  ProductListComponent,
      data: {
        title: MENU_NAME.PRODUCT_LIST
      },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
