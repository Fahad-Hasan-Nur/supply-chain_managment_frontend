import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddUserDialogComponent } from './dialog/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['number', 'name','office','role','ক্রিয়া'];
  dataSource = new MatTableDataSource<IPLData>(data);
  showFilters: boolean;
  ngOnInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  search(data){

  }
  openDialogUser() {
    this.dialog.open(AddUserDialogComponent);
  }

}
export interface IPLData {
  name: string;
  office: string;
  number: number;
  role : string;
}

const data: IPLData[] = [
  {name: 'সুজিত কুমার পাল', office: 'বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)',number:1,role :'সুপার এডমিন'},
  { name: 'মোঃ আসাদুল্লাহ হিল গালিব',  office: 'বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)',number:2,role :'সচিব'},
  { name: 'তায়েফ ইমাম', office: 'বাংলাদেশ কম্পিউটার কাউন্সিল (বিসিসি)',number:3,role :'প্রকল্প সদস্য'},
  { name: 'ইরফাত আরা', office: 'জিআরপি টেস্ট অফিস (প্লানিং)',number:4,role :'প্রকল্প ব্যবস্থাপক '},
  { name: 'তায়েফ ইমাম', office: 'জিআরপি টেস্ট অফিস (প্লানিং)',number:5,role :'জিইডি লেখক'},
  {name: 'মোঃ আসাদুল্লাহ হিল গালিব',  office: 'জিআরপি টেস্ট অফিস (প্লানিং)',number:6,role :'সুপার এডমিন'},
];
