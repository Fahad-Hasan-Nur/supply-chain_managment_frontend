import { Transaction } from './../../../common/model/transaction';
import { RequisitionViewComponent } from './../component/requisition-view/requisition-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Requisition } from '../../../common/model/requisition';
import { DealerService } from '../../../service/dealer/dealer.service';
import { ToastService } from '../../../common/service/toast.service';
import { success_message } from '../../../common/constant/messages';

@Component({
  selector: 'app-unverified-requisition',
  templateUrl: './unverified-requisition.component.html',
  styleUrls: ['./unverified-requisition.component.scss']
})
export class UnverifiedRequisitionComponent implements OnInit {

  constructor(private service: DealerService, protected dialog: MatDialog, private toastService: ToastService,
    ) { }
  public requisition: Requisition[] = [];
  public transaction: Transaction[] = [];
  public displayedColumns: string[] = ['Product Name', 'Status','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public loading: boolean=false;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getRequisitionByStatus("Pending").subscribe
      (
        (response) => {
          this.requisition = response;
          this.dataSource.data = response as Requisition[];
          console.log(this.requisition);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {  }

  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        requisition: data
    };
    this.dialog.open(RequisitionViewComponent, dialogConfig);
  }

  public verifyTransaction(data?) {
    this.loading=true;
    this.service.getTransactionByRequisitionId(data.id).subscribe
      (
        (response) => {
          this.transaction = response;
          this.transaction.forEach(element => {
            this.askForVerification(element.id);
          });
          this.requisitionChangeStatus(data.id);
        },
        (error) => {
          this.loading=false;
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILED_FOR_VERIFICATION, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        }
      );
    
  }
  private askForVerification(id:string){
    this.service.processTransaction(id).subscribe
    (
      (response) => {
        console.log(response)
      },
      (error) => {
        this.loading=false;
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILED_FOR_VERIFICATION, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      }
    );
  }
  private requisitionChangeStatus(id:string){
    this.service.processRequisition(id).subscribe
    (
      (response) => {
        console.log(id)

        console.log(response);
        this.toastService.openSnackBar(success_message.SUCCESS_FOR_VERIFICATION, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loading=false;
      },
      (error) => {
        this.loading=false;
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILED_FOR_VERIFICATION, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      }
    );
  }
}

