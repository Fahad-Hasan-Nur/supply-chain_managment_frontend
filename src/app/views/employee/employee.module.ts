import { Admin } from './../../common/model/admin';
import { LoaderComponent } from './loader.component';
import { NgModule } from '@angular/core';
import { EmplyeeComponent } from './employee.component';
import { EmplyeeRoutingModule } from './empolyee-routing.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployListComponent } from './employ-list/employ-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { EmployeeViewComponent } from './dialog/employee-view/employee-view.component';
import { EmployeeEditComponent } from './dialog/employee-edit/employee-edit.component';


@NgModule({
  imports: [
    EmplyeeRoutingModule,
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents:[EmployeeEditComponent,EmployeeViewComponent],
  providers: [DatePipe,Admin],
  declarations: [ EmplyeeComponent, EmployeeAddComponent, EmployListComponent,LoaderComponent, EmployeeViewComponent, EmployeeEditComponent]
})
export class EmployeeModule { }
