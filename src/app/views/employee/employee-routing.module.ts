import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { EmployeeListComponent } from './component/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: URL_NAME.EMP_LIST,
    component: EmployeeListComponent,
    data: {
      title: MENU_NAME.EMP_LIST
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
