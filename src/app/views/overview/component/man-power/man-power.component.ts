import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import { Employee } from '../../../../common/model/employee';
import { LoaderComponent } from '../loader/loader.component';

import { OfficeService } from '../../../../service/office/office.service';
import { UsersService } from '../../../../service/users/users.service';
import { AddMemberDialogComponent } from './dialog/add-member-dialog/add-member-dialog.component';
import { ViewMemberDialogComponent } from './dialog/view-member-dialog/view-member-dialog.component';

@Component({
  selector: 'app-man-power',
  templateUrl: './man-power.component.html',
  styleUrls: ['./man-power.component.scss']
})
export class ManPowerComponent implements OnInit {
  @ViewChild(LoaderComponent,{static:false}) loader: LoaderComponent;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'name', 'action'];
  dataSource: MatTableDataSource<Employee>;
  employees: Employee[];

  constructor(public dialog: MatDialog,
     private officeService: OfficeService,
     private userService: UsersService) {}
  ngOnInit(){
    this.dataSource = new MatTableDataSource<Employee>();
  }
  ngAfterViewInit(){
  this.loadData();
  }
  loadData(){
    this.loader.loading = true;
    this.officeService.getMemberByProjectId(this.userService.usersStorage().projectId).subscribe(res=>{
        this.employees = res;
        this.dataSource.data = this.employees;
        this.loader.loading = false;
    })
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search(data){
  }
  openDialogTeam() {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '60%',
      height:'80%',
      data: this.employees
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }
  openDialog(value) {
    this.dialog.open(ViewMemberDialogComponent);
  }
}


