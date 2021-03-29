import { StateService } from './../../../../common/service/state.service';
import { AdminService } from './../../../../service/admin/admin.service';
import { VerifiedDealerInfo } from './../../../../common/model/verified-dealer-info';
import { VerifiedDealerComponent } from './../../verified-dealer/verified-dealer.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Admin } from '../../../../common/model/admin';
import { ToastService } from '../../../../common/service/toast.service';
import { DealerService } from '../../../../service/dealer/dealer.service';
import { ImageService } from '../../../../service/image/image.service';
import { success_message } from '../../../../common/constant/messages';

@Component({
  selector: 'app-verify-dealer',
  templateUrl: './verify-dealer.component.html',
  styleUrls: ['./verify-dealer.component.scss']
})
export class VerifyDealerComponent implements OnInit {

  public view: boolean=false;
  public dealerVerified:boolean=false;
  public nidVerified: number=-1;
  public tinVerified: number=-1;
  public verifiedDealerInfo:VerifiedDealerInfo[]=[];
  public tinNumber:string;
  public nidNumber:string;
  public nid:boolean=true;
  public tin: boolean=false;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public retrievedImage1: any;
  public base64Data1: any;
  public retrieveResonse1: any;
  public toolbarOptions: any;

  constructor(
    private dealerService: DealerService,
    private stateService:StateService,
    private adminService:AdminService,
    private imageService: ImageService,
    private toastService: ToastService,
    public dealer: Admin,
    public info:VerifiedDealerInfo,
    private dialogRef: MatDialogRef<VerifyDealerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.dealer = data.dealer;
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
    this.getNidImage(this.dealer.nidId);
    this.getTinImage(this.dealer.tinId);
    this.getAllDealerInfo();
    this.stateService.setVerifiedDealerInfo(this.info);
  }
  close() {
    this.dialogRef.close();
  }
  public verifyNid() {
    this.nid=true;
    this.tin=false;


  }
  public verifyTin() {
    this.nid=false;
    this.tin=true;
  }

  private getTinImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse1 = response;
          this.base64Data1 = this.retrieveResonse1.picByte;
          this.retrievedImage1 = 'data:image/jpeg;base64,' + this.base64Data1;
        },
        (error) => console.log(error),
      );
  }
  private getNidImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse= response;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
  }
  public checkNid(){
    this.nidVerified=-1;
    this.verifiedDealerInfo.forEach(element => {
      if(this.nidNumber==element.nid){
         this.nidVerified=0;
      }
    });
    if(this.nidVerified!=0){
      this.nidVerified=1;
    }
  }
  public checkTin(){
    this.tinVerified=-1;
    this.verifiedDealerInfo.forEach(element => {
      if(this.tinNumber==element.nid){
         this.tinVerified=0;
      }
    });
    if(this.tinVerified!=0){
      this.tinVerified=1;
    }
  }
  private getAllDealerInfo(){
    this.dealerService.getVerifiedDealerInfo().subscribe
    (
      (res)=>{
        this.verifiedDealerInfo=res;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  public verifyDealer(){

    this.dealerVerified=true;
  }
  public verify(){
    this.info.createdBy=this.adminService.usersStorage().id;
    this.info.nid=this.nidNumber;
    this.info.tin=this.tinNumber;
    this.info.userId=this.adminService.usersStorage().id;
    this.dealerService.addVerifiedDealerInfo(this.stateService.getVerifiedDealerInfo()).subscribe
    (
      (res)=>{
        this.updateDealer();
      },
      (error)=>{
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        console.log(error);
      }
    );
  }
  private updateDealer(){
    this.toastService.openSnackBar(success_message.VERIFIED_DEALER_PROCESSING, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
    this.dialogRef.close();
    this.adminService.verifyDealer(this.dealer.id).subscribe(
      (response) => {
        this.toastService.openSnackBar(success_message.VERIFIED_DEALER_SUCCESS, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
      },
      (error) => {console.log(error),
      this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      });
  }

}
