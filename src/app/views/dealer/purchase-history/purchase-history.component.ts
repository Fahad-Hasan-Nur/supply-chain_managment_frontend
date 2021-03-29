import { ToastService } from './../../../common/service/toast.service';
import { Requisition } from './../../../common/model/requisition';
import { AdminService } from './../../../service/admin/admin.service';
import { Transaction } from './../../../common/model/transaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DealerService } from '../../../service/dealer/dealer.service';
import { PaymentComponent } from '../component/payment/payment.component';
import { PaymentViewComponent } from '../component/payment-view/payment-view.component';
import { success_message } from '../../../common/constant/messages';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(
    private service: DealerService,
    protected dialog: MatDialog,
    private storage: AdminService,
    private toastService:ToastService
  ) { }
  public transaction: Transaction[] = [];
  public displayedColumns: string[] = ['Transaction Id','Paid', 'Due', 'Action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public req: Requisition;
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getTransactionByUser(this.storage.usersStorage().id).subscribe
      (
        (response) => {
          this.dataSource.data = response as Transaction[];
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {}

  openDialogPay(a:Transaction) {
    if(a.status!="Complete"){
      this.toastService.openSnackBar(success_message.TRANSACTION_NOT_PROCESSED, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
    }else{
      this.getRequisition(a.requisitionId);
    }
  }
  openDialog(data:Transaction) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      requisition: data
    };
    this.dialog.open(PaymentComponent, dialogConfig);
  }
  public getRequisition(id){
    this.service.getRequisitionById(id).subscribe
    (
      (response) => {
        this.req = response;
        this.openDialog(this.req)
      },
      (error) => console.log(error),
    );

  }
  openDialogView(data?) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          transaction: data
      };
      this.dialog.open(PaymentViewComponent, dialogConfig);
  }

}
