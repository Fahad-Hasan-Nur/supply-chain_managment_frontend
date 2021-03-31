import { Admin } from './../../../common/model/admin';
import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageService } from '../../../service/image/image.service';
import { StateService } from '../../../common/service/state.service';
import { ToastService } from '../../../common/service/toast.service';
import { success_message } from '../../../common/constant/messages';
import * as _ from 'lodash';
import { AppBreadcrumbService } from '../../../core/breadcrumb/app-breadcrumb.service';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  @ViewChild(LoaderComponent, { static: false }) 
  public loader: LoaderComponent;

  public myFilter: any;
  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public selectedFile: File;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private imageService: ImageService,
    private stateService: StateService,
    private toastService : ToastService,
    public appBarService: AppBreadcrumbService,
    public data: Admin,
    ) {
}

  ngOnInit() {
    this.setStateAdmin(this.data);
  }
  public setStateAdmin(admin: Admin): void {
    this.stateService.setAdmin(admin);
  }
  public save() {
    this.loader.loading=true;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageService.uploadImage(uploadImageData).subscribe
    (
      (response) => {
        this.retrieveResonse=response;
        console.log(this.retrieveResonse);
        this.data.imageName=this.retrieveResonse.name;
        this.data.imageId=this.retrieveResonse.id;
        this.saveData();
        this.loader.loading = false;

      }, (error) => {
   this.loader.loading = false;
   this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);

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
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
        this.selectedFile = fileInput.target.files[0];
    }
}
private saveData(){
  this.data.createdBy=this.adminService.usersStorage().id;
  console.log(this.stateService.getAdmin())
  this.adminService.addAdmin(this.stateService.getAdmin()).subscribe
    (
      (response) => {
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loader.loading = false;
        console.log(this.data);
      });

}

public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.selectedFile = null;
}
}
