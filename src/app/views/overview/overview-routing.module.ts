import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    data: {
      title: MENU_NAME.PRJ_OVERVIEW
    }
  },
  {
    path: URL_NAME.PRJ_OVERVIEW_ID,
    component: OverviewComponent,
    data: {
      title: MENU_NAME.PRJ_OVERVIEW
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
