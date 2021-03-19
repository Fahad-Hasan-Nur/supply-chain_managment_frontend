import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { success_message } from '../../../../common/constant/messages';
import { Admin } from '../../../../common/model/admin';
import { ToastService } from '../../../../common/service/toast.service';
import { AdminService } from '../../../../service/admin/admin.service';
import { LoaderComponent } from '../../loader.component';

@Component({
  selector: 'app-reject-dealer',
  templateUrl: './reject-dealer.component.html',
  styleUrls: ['./reject-dealer.component.scss']
})
export class RejectDealerComponent implements OnInit {

  public toolbarOptions;
  public rejectionMessage:string;
  public loading: boolean;

  constructor(
    private adminService: AdminService, 
    private toastService: ToastService,
    public dealer: Admin,
    private dialogRef: MatDialogRef<RejectDealerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.dealer = data.dealer;
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
     }
 
  public reject() {
    this.loading=true;
    this.toastService.openSnackBar(success_message.REJECT_DEALER_PROCESSING, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
    this.loading=false;
    this.dialogRef.close();
    this.adminService.rejectDealer(this.rejectionMessage,this.dealer).subscribe(
      (response) => {
        this.toastService.openSnackBar(success_message.REJECT_DEALER_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loading = false;
        console.log(response);
      },
      (error) => {console.log(error),
      this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      this.loading = false;
      });
  }
}
