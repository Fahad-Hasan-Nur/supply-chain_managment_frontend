import { DealerViewComponent } from './../component/dealer-view/dealer-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Admin } from '../../../common/model/admin';
import { AdminService } from '../../../service/admin/admin.service';
import { success_message } from '../../../common/constant/messages';
import { LoaderComponent } from '../loader.component';
import { ToastService } from '../../../common/service/toast.service';

@Component({
  selector: 'app-unverified-dealer',
  templateUrl: './unverified-dealer.component.html',
  styleUrls: ['./unverified-dealer.component.scss']
})
export class UnverifiedDealerComponent implements OnInit {
  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

  constructor(protected dialog: MatDialog, private adminService: AdminService, private toastService: ToastService,
    ) { }
  public admin: Admin[] = [];
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

  openDelete() {

  }
  openVerify(data?) {
    this.adminService.verifyDealer(data.id).subscribe(
      (response) => {
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
        console.log(response);
      },
      (error) => {console.log(error),
      this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      this.loader.loading = false;
      });
  }


}

