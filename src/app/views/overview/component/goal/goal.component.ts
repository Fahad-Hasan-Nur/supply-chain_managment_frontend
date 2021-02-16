import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { DescriptionComponent } from './component/description/description.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

  constructor(protected dialog: MatDialog) {}
  displayedColumns: string[] = [ 'name', 'action'];
  dataSource = new MatTableDataSource<IPLData>(data);

  ngOnInit(){
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
  viewDescriptionPage(id?){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        name: id
    };
    this.dialog.open(DescriptionComponent, dialogConfig);
  }
}
export interface IPLData {
  name: string;
}

const data: IPLData[] = [
  {name: 'রাস্তা নির্মান'},
  {name: 'দারিদ্র্য বিমোচন'},
  {name: 'সড়ক নির্মাণ'},
  {name: 'হাসপাতাল নির্মাণ'},
  {name: 'স্কুল নির্মান'},
  {name: 'বাড়ি নির্মাণ'},
];


