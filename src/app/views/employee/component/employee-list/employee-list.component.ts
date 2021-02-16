import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  task: Array<Employee> = new Array<Employee>();

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  displayColumns: string[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(protected dialog: MatDialog,
              protected snackbar: MatSnackBar,protected router: Router) {}
  ngOnInit(): void {
    this.displayColumns = ['sl', 'employeeName','designationName', 'officeName', 'ministryName'];
  }


}
