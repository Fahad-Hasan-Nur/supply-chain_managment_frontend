import { EmployListComponent } from './employ-list/employ-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME, URL_NAME} from '../../common/constant/nav.constant'
import { EmplyeeComponent } from './employee.component';
const routes: Routes = [
  {
    path: '',
    component: EmplyeeComponent,

    children: [
      {
      path:  URL_NAME.EMPLOYEE_ADD,
      component:  EmployeeAddComponent,
      data: {
        title: MENU_NAME.EMPLOYYE_ADD
      },
      },
      {
      path:  URL_NAME.EMPLOYEE_LIST,
      component:  EmployListComponent,
      data: {
        title: MENU_NAME.EMPLOYYE_LIST
      },
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmplyeeRoutingModule {}
