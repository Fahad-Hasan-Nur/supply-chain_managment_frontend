import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant'
import { MasterSettingComponent } from './master-setting.component';
import { PermissionComponent } from './permission/permission.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
const routes: Routes = [
  {
    path: '',
    component: MasterSettingComponent,
    children: [
      {
        path: URL_NAME.USER_ROLES,
        component: UserRolesComponent,
        data: {
          title: MENU_NAME.USER_ROLES,
        },
      },
      {
        path: URL_NAME.USER_PERMISSION,
        component: PermissionComponent,
        data: {
          title: MENU_NAME.USER_PERMISSION,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterSettingRoutingModule { }
