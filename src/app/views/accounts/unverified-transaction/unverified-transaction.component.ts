import { Requisition } from './../../../common/model/requisition';
import { error_message } from './../../../common/constant/messages';
import { AdminService } from './../../../service/admin/admin.service';
import { ToastService } from './../../../common/service/toast.service';
import { TransactionViewComponent } from './../component/transaction-view/transaction-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from '../../../common/model/transaction';
import { DealerService } from '../../../service/dealer/dealer.service';
import { success_message } from '../../../common/constant/messages';
import { User } from '../../../common/model/user';
import { DealerViewComponent } from '../component/dealer-view/dealer-view.component';

@Component({
  selector: 'app-unverified-transaction',
  templateUrl: './unverified-transaction.component.html',
  styleUrls: ['./unverified-transaction.component.scss']
})
export class UnverifiedTransactionComponent implements OnInit {

  constructor(
    private service: DealerService,
    protected dialog: MatDialog,
    private toastService: ToastService,
    public adminService: AdminService,
    public dealerService: DealerService
  ) { }
  public transaction: Transaction[] = [];
  public tran: Transaction[] = [];
  public trans: Transaction[] = [];
  private req: Requisition;
  private check: number = 0;
  private dealer: User;
  public loading: boolean = false;
  public displayedColumns: string[] = ['Transaction Id', 'Status', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getTransactionByStatus("Processing").subscribe
      (
        (response) => {
          this.transaction = response;
          this.dataSource.data = response as Transaction[];
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) { }

  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      transaction: data
    };
    this.dialog.open(TransactionViewComponent, dialogConfig);
  }

  public verifyNow(data?) {
    this.loading = true;
    this.service.completeTransaction(data.id).subscribe
      (
        (response) => {
          this.verifyRequisition(data);
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loading = false;
        });
  }
  private verifyRequisition(data: Transaction) {
    this.service.getTransactionByRequisitionId(data.requisitionId).subscribe
      (
        (res) => {
          this.tran = res;
          this.tran.forEach(element => {
            if (element.status == "Complete") {
              this.check = this.check + 1;
            } else {
              this.check = -100000;
            }
          });
          if (this.check > 0) {
            this.changeStatus(data.requisitionId);
          }
        },
        (error) => {
          console.log(error);
        }
      )

    this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
    this.loading = false;
  }
  private changeStatus(id: string) {
    this.service.getRequisitionById(id).subscribe
      (
        (response) => {
          this.req = response;
          if (this.req.status != "Complete") {
            this.service.verifyRequisition(id).subscribe
              (
                (res) => {
                },
                (error) => {
                  console.log(error);
                }
              )
          }
        }, (error) => {
          console.log(error);

        });

  }
  public deleteTransaction(data: Transaction) {
    this.loading = true;
    this.dealerService.deleteTransactionById(data.id).subscribe
      (
        (response) => {
          this.toastService.openSnackBar(success_message.DELETED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loading = false

        }, (error) => {
          console.log(error);
          this.updateRequisition(data.requisitionId);
        });

  }
  public contactDealer(data: Transaction) {
    this.adminService.getAdminById(data.userId).subscribe
      (
        (res) => {
          this.dealer = res;
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.data = {
            dealer: this.dealer
          };
          this.dialog.open(DealerViewComponent, dialogConfig);
        },
        (error) => {
          console.log(error);
        }
      )
  }
  private updateRequisition(id: string) {

    this.dealerService.getTransactionByRequisitionId(id).subscribe
      (
        (response) => {
          this.trans = response;
          if (this.trans.length < 1) {
            this.updateOnCartRequisition(id);
          }
          this.loading = false
        }, (error) => {
          console.log(error);
        });
  }
  private updateOnCartRequisition(id: string) {
    this.service.getRequisitionById(id).subscribe
      (
        (response) => {
          this.req = response;
          this.updateOnCart(this.req);
        }, (error) => {
          console.log(error);
          this.loading = false;

        });
  }
  private updateOnCart(data: Requisition) {
    this.req.status = "cart";
    this.service.updateRequisition(data).subscribe
      (
        (response) => {
          this.loading = false;
        }, (error) => {
          this.loading = false;

          console.log(error);
        });
  }

}

