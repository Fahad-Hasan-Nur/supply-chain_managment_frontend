import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { MasterSettingRoutingModule } from './master-setting-routing.module';
import { MasterSettingComponent } from './master-setting.component';
import { PermissionComponent } from './permission/permission.component';
import { AddUserDialogComponent } from './user-roles/dialog/add-user-dialog/add-user-dialog.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

@NgModule({
  declarations: [MasterSettingComponent, UserRolesComponent, AddUserDialogComponent, PermissionComponent],
  entryComponents:[AddUserDialogComponent],
  imports: [
    CommonModule,
    MasterSettingRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe]
})
export class MasterSettingModule {
  constructor() {
    console.log('master-setting-module loaded');
  }
}
