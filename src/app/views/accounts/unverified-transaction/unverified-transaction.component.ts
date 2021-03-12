import { ToastService } from './../../../common/service/toast.service';
import { TransactionViewComponent } from './../component/transaction-view/transaction-view.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from '../../../common/model/transaction';
import { DealerService } from '../../../service/dealer/dealer.service';
import { success_message } from '../../../common/constant/messages';
import { Requisition } from '../../../common/model/requisition';

@Component({
  selector: 'app-unverified-transaction',
  templateUrl: './unverified-transaction.component.html',
  styleUrls: ['./unverified-transaction.component.scss']
})
export class UnverifiedTransactionComponent implements OnInit {

  constructor(private service: DealerService, protected dialog: MatDialog,private toastService:ToastService) { }
  public transaction: Transaction[] = [];
  public tran: Transaction[] = [];
  private check: number=0;
  public loading:boolean=false;
  public displayedColumns: string[] = ['Transaction Id', 'Status','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getTransactionByStatus("Processing").subscribe
      (
        (response) => {
          this.transaction = response;
          this.dataSource.data = response as Transaction[];
          console.log(this.transaction);
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
        transaction: data
    };
    this.dialog.open(TransactionViewComponent, dialogConfig);
  }

   public verifyNow(data?) {
     this.loading=true;
    this.service.completeTransaction(data.id).subscribe
    (
      (response) => {
        this.verifyRequisition(data);
        console.log(response);
        
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loading = false;
      });  
    }
    private verifyRequisition(data:Transaction){
        this.service.getTransactionByRequisitionId(data.requisitionId).subscribe
        (
          (res)=>{
            this.tran=res;
            this.tran.forEach(element => {
              if(element.status=="Complete"){
                this.check=this.check+1;
              }else{
                this.check=-100000;
              }
            });
            if(this.check>0){
              this.changeStatus(data.requisitionId);
            }
          },
          (error)=>{
            console.log(error);
          }
        )

      this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
      this.loading = false;
    }
    private changeStatus(id:string){
        this.service.verifyRequisition(id).subscribe
        (
          (res)=>{
            console.log(res);
          },
          (error)=>{
            console.log(error);
          }
        )
    }
}

