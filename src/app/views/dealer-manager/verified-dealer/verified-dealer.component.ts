import { DealerViewComponent } from './../component/dealer-view/dealer-view.component';
import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Admin } from '../../../common/model/admin';

@Component({
  selector: 'app-verified-dealer',
  templateUrl: './verified-dealer.component.html',
  styleUrls: ['./verified-dealer.component.scss']
})
export class VerifiedDealerComponent implements OnInit {

  constructor(protected dialog: MatDialog,private adminService:AdminService) { }
  public admin: Admin[] = [];
  public displayedColumns: string[] = ['Name', 'Mobile','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.adminService.getActiveDealers().subscribe
      (
        (response) => {
          this.admin = response;
          this.dataSource.data = response as Admin[];
          console.log(this.admin);
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
        dealer: data
    };
    this.dialog.open(DealerViewComponent, dialogConfig);
  }

}

