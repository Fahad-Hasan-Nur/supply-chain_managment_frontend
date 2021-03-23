import { VerifyDealerComponent } from './../component/verify-dealer/verify-dealer.component';
import { DealerViewComponent } from './../component/dealer-view/dealer-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Admin } from '../../../common/model/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { ToastService } from '../../../common/service/toast.service';
import { RejectDealerComponent } from '../component/reject-dealer/reject-dealer.component';

@Component({
  selector: 'app-unverified-dealer',
  templateUrl: './unverified-dealer.component.html',
  styleUrls: ['./unverified-dealer.component.scss']
})
export class UnverifiedDealerComponent implements OnInit {

  constructor(protected dialog: MatDialog, private adminService: AdminService, private toastService: ToastService,
    ) { }
  public admin: Admin[] = [];
  public loading:boolean=false;
  public displayedColumns: string[] = ['Name', 'Mobile', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.adminService.getInactiveDealers().subscribe
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

  openDelete(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dealer: data
    };
    this.dialog.open(RejectDealerComponent, dialogConfig);
  }
  openVerify(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dealer: data
    };
    this.dialog.open(VerifyDealerComponent, dialogConfig);
  }

}

