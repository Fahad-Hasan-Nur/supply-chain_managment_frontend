import { Admin } from './../../model/admin';
import { TOKEN } from './../../constant/storage-variables.constant';

import { Component, OnInit, ViewChild } from '@angular/core';
import { TestLoginService } from '../../../service/test-login.service';
import { success_message } from '../../constant/messages';
import { URL } from '../../constant/nav.constant';
import { Auth } from '../../model/auth';
import { AuthService } from '../../service/auth/auth.service';
import { StateService } from '../../service/state.service';
import { ToastService } from '../../service/toast.service';
import { StorageService } from './../../service/storage/storage.service';
import { AdminService } from '../../../service/admin/admin.service';
import { ImageService } from '../../../service/image/image.service';
import * as _ from 'lodash';

@Component({
  templateUrl: '500.component.html',
  styleUrls: ['500.component.scss'],
})
export class P500Component implements OnInit  {
  public loading:boolean;

  public error: boolean=true;
  public login: boolean=true;
  public myFilter: any;
  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public selectedFile: File;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;

  public imageError1: string;
  public isImageSaved1: boolean;
  public cardImageBase641: string;
  public selectedFile1: File;
  public retrievedImage1: any;
  public base64Data1: any;
  public retrieveResonse1: any;

  public imageError2: string;
  public isImageSaved2: boolean;
  public cardImageBase642: string;
  public selectedFile2: File;
  public retrievedImage2: any;
  public base64Data2: any;
  public retrieveResonse2: any;
  
  constructor(private testLoginService: TestLoginService,
              private storage: StorageService,
              private stateService: StateService,
              public data: Auth,
              public admin:Admin,
              private auth: AuthService,
              private adminService: AdminService,
              private imageService: ImageService,
              private toastService : ToastService,
              ) { }

    public ngOnInit() {
      this.setStateAuth(this.data);
      this.setStateAdmin(this.admin);
  }
  public setStateAdmin(admin: Admin): void {
    this.stateService.setAdmin(admin);
  }

    public setStateAuth(auth: Auth): void {
      this.stateService.setAuth(auth);
    }

    public removeImage() {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
      this.selectedFile = null;
  }

  public removeImage1() {
    this.cardImageBase641 = null;
    this.isImageSaved1 = false;
    this.selectedFile1 = null;
}

public removeImage2() {
  this.cardImageBase642 = null;
  this.isImageSaved2 = false;
  this.selectedFile2 = null;
}
   public testLogin() {
    this.testLoginService.getTestLogin(this.stateService.getAuth()).subscribe(
      (res) => {
        this.storage.save(TOKEN,res.jwt)
        window.location.replace(window.location.href.replace('/page-not-found', URL.PRODUCT_LIST) + '?token=' + res.jwt);
      },
      (err) => {
        console.log(err);
        this.error=false;
      });
  }
  public register(){
    this.login=false;
  }
  public loginn(){
    this.login=true;
  }
  public save() {
     this.loading=true;
     const uploadImageData = new FormData();
     uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
     this.imageService.uploadImage(uploadImageData).subscribe
     (
       (response) => {
         this.retrieveResonse=response;
         console.log(this.retrieveResonse);
         this.admin.imageName=this.retrieveResonse.name;
         this.admin.imageId=this.retrieveResonse.id;
         this.saveNid();
       }, (error) => {
        this.loading = false;
         console.log(error);
       });
   }
   private saveNid(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile1, this.selectedFile1.name);
    this.imageService.uploadImage(uploadImageData).subscribe
    (
      (response) => {
        this.retrieveResonse1=response;
        console.log(this.retrieveResonse1);
        this.admin.nidId=this.retrieveResonse1.id;
        this.saveTin();
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
   }
   private saveTin(){
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile2, this.selectedFile2.name);
    this.imageService.uploadImage(uploadImageData).subscribe
    (
      (response) => {
        this.retrieveResonse2=response;
        console.log(this.retrieveResonse2);
        this.admin.tinId=this.retrieveResonse2.id;
        this.saveData();
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
   }
   public fileChangeEvent(fileInput: any) {
     this.imageError = null;
     if (fileInput.target.files && fileInput.target.files[0]) {
         // Size Filter Bytes
         const max_size = 2097000;
         const allowed_types = ['image/png', 'image/jpeg'];
         const max_height = 300;
         const max_width = 300;
 
         if (fileInput.target.files[0].size > max_size) {
             this.imageError =
                 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
             return false;
         }
         if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
             this.imageError = 'Only Images are allowed ( JPG | PNG )';
             return false;
         }
         const reader = new FileReader();
         reader.onload = (e: any) => {
             const image = new Image();
             image.src = e.target.result;
             image.onload = rs => {
               const img_height = rs.currentTarget['height'];
               const img_width = rs.currentTarget['width'];
               if (img_height > max_height && img_width > max_width) {
                     this.imageError =
                         'Maximum dimentions allowed ' +
                         max_height +
                         '*' +
                         max_width +
                         'px';
                     return false;
                 } else {
                     const imgBase64Path = e.target.result;
                     this.cardImageBase64 = imgBase64Path;
                     this.isImageSaved = true;
                     // this.previewImagePath = imgBase64Path;
                 }
             };
         };
         reader.readAsDataURL(fileInput.target.files[0]);
         this.selectedFile = fileInput.target.files[0];
     }
 }
 public fileChangeEvent1(fileInput: any) {
  this.imageError1 = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 2097000;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError1 =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          return false;
      }
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError1 = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];
            if (img_height > max_height && img_width > max_width) {
                  this.imageError1 =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase641 = imgBase64Path;
                  this.isImageSaved1= true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      this.selectedFile1 = fileInput.target.files[0];
  }
}
public fileChangeEvent2(fileInput: any) {
  this.imageError2 = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 2097000;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 300;
      const max_width = 300;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError2 =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          return false;
      }
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError2 = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];
            if (img_height > max_height && img_width > max_width) {
                  this.imageError2 =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase642 = imgBase64Path;
                  this.isImageSaved2 = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      this.selectedFile2 = fileInput.target.files[0];
  }
}
 private saveData(){
   this.admin.createdBy=this.admin.name;
   this.admin.role='DEALER';
   this.admin.verified=false;
   console.log(this.stateService.getAdmin())
   this.adminService.addDealer(this.stateService.getAdmin()).subscribe
     (
       (response) => {
         console.log(response);
         this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
         this.toastService.openSnackBar(success_message.MAIL, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loading = false;
       }, (error) => {
         console.log(error);
         this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loading = false;
       });
 
 }
}
