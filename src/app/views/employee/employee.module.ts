import { NgModule } from '@angular/core';
import { EmplyeeComponent } from './employee.component';
import { EmplyeeRoutingModule } from './empolyee-routing.module';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployListComponent } from './employ-list/employ-list.component';


@NgModule({
  imports: [
    EmplyeeRoutingModule,
  ],
  declarations: [ EmplyeeComponent, EmployeeAddComponent, EmployListComponent ]
})
export class EmployeeModule { }
