import { Admin } from './../../../../common/model/admin';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StateService } from '../../../../common/service/state.service';
import { ToastService } from '../../../../common/service/toast.service';
import { AdminService } from '../../../../service/admin/admin.service';
import { ImageService } from '../../../../service/image/image.service';
import { LoaderComponent } from '../../loader.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { success_message } from '../../../../common/constant/messages';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @ViewChild(LoaderComponent) public loader: LoaderComponent;

  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public myFilter: any;
  public selectedFile: File;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public message: string;
  public imageName: any;

  constructor(
               private adminService: AdminService,
               private imageService: ImageService,
               private toastService: ToastService,
               private stateService: StateService,
               public admin: Admin,
               private dialogRef: MatDialogRef<EmployeeEditComponent>,
               @Inject(MAT_DIALOG_DATA) data,
               private ren: Renderer2,
               ) {
                 this.admin = data.employee;
             }

  public ngOnInit() {
    this.setStateAdmin(this.admin);
    this.getImage(this.admin.imageId);
  }
  

  public setStateAdmin(admin: Admin): void {
    this.stateService.setAdmin(admin);
  }
  public save() {
    this.loader.loading = true;
    if(this.selectedFile!=null){
      this.saveImage();
    }else{
      this.saveData();
    }
  }
  public fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 2097000/5;
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
private saveImage(){
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  this.imageService.uploadImage(uploadImageData).subscribe
  (
    (response) => {
      this.retrieveResonse=response;
      this.admin.imageName=this.retrieveResonse.name;
      this.admin.imageId=this.retrieveResonse.id;
      this.saveData();

    }, (error) => {
      console.log(error);
    });
}
private saveData(){
  this.admin.updatedBy=this.adminService.usersStorage().id;
  this.adminService.updateAdmin(this.stateService.getAdmin()).subscribe
    (
      (response) => {
        this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
         this.loader.loading = false;
       });
}

public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.selectedFile = null;
}
close() {
  this.dialogRef.close();
}
getImage(id) {
  this.imageService.getImageById(id).subscribe
    (
      (response) => {
        this.retrieveResonse = response;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      (error) => console.log(error),
    );
}
}
