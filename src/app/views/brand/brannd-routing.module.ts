import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant';
import { BrandComponent } from './brand.component';
const routes: Routes = [
  {
    path: URL_NAME.BRAND,
    component: BrandComponent,
    data: {
      title: MENU_NAME.BRAND,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule { }
