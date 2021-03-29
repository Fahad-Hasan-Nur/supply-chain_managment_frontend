import { DealerService } from './../../../../service/dealer/dealer.service';
import { AdminService } from './../../../../service/admin/admin.service';
import { Transaction } from './../../../../common/model/transaction';
import { Requisition } from './../../../../common/model/requisition';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from '../../../../common/service/toast.service';
import { StateService } from '../../../../common/service/state.service';
import { success_message } from '../../../../common/constant/messages';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  
  public myFilter: any;
  public loading: boolean;
  public error: boolean=true;
  public amountToBePaid:number;
  private tran: Transaction[]=[];
  private due:number=1000000000000000000000;

public requisition: Requisition;
  constructor(
    public dialog: MatDialog,
    public dearlerService:DealerService,
    public storage:AdminService,
    private stateService: StateService,
    private toastService : ToastService,
    public transaction: Transaction,
    private dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.requisition = data.requisition;
      console.log(this.requisition)
  }


  ngOnInit() {
    this.setStateTransaction(this.transaction);
    this.findTransaction();
  }
  public setStateTransaction(transaction: Transaction): void {
    this.stateService.setTransaction(transaction);
  }
  public save(){
     if(this.transaction.paid>this.amountToBePaid){
       this.error=false;
     }else{
       this.savee();
     }
  }
public savee(){
  this.transaction.createdBy = this.storage.usersStorage().id;
  this.transaction.requisitionId=this.requisition.id;
  this.transaction.userId = this.storage.usersStorage().id;
  if(this.requisition.status!="Pending"&&this.requisition.status!="cart"){
    this.transaction.status="Processing";
  }else{
    this.transaction.status="Pending";
  }
  this.transaction.due=this.amountToBePaid-this.transaction.paid;
  this.dearlerService.addTransaction(this.stateService.getTransaction()).subscribe
    (
      (response) => {
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        if(this.requisition.status=="cart"){
          this.requisition.status="Pending";
          this.updateRequisition();
        }
        this.loading = false;
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loading = false;
      });

}
private updateRequisition(){
  this.dearlerService.updateRequisition(this.requisition).subscribe
    (
      (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}
close() {
  this.dialogRef.close();

}
 private findTransaction(){
  this.dearlerService.getTransactionByRequisitionId(this.requisition.id).subscribe
  (
    (response) => {
      this.tran=response;
      if(this.tran.length>0){
        this.tran.forEach(element => {
          if(element.due<this.due){
            this.due=element.due;
            this.amountToBePaid=this.due;
          }
        });
      }else{
        this.amountToBePaid=this.requisition.totalCost;
      }
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  

 }
}
