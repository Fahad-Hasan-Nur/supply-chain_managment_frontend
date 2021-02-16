import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import {MENU_NAME} from '../../common/constant/nav.constant'
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: MENU_NAME.PRJ_DASHBOARD
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
