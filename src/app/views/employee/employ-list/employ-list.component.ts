import { EmployeeViewComponent } from './../dialog/employee-view/employee-view.component';
import { Admin } from './../../../common/model/admin';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin/admin.service';
import { EmployeeEditComponent } from '../dialog/employee-edit/employee-edit.component';

@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrls: ['./employ-list.component.scss']
})
export class EmployListComponent implements OnInit {

  constructor(private http: HttpClient, private service: AdminService, public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public admin: Admin[] = [];
  public displayedColumns: string[] = ['Name', 'Mobile', 'Role','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public brandId: string;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getAdmins().subscribe
      (
        (response) => {
          this.admin = response;
          this.dataSource.data = response as Admin[];
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }

  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        employee: data
    };
    this.dialog.open(EmployeeViewComponent, dialogConfig);
  }

  openDialogEdit(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        employee: data
    };
    this.dialog.open(EmployeeEditComponent, dialogConfig);
  }
}

