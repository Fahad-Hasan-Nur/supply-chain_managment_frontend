import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DemoMaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeeModule { }
