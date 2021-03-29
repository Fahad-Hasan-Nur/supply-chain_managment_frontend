import { Category } from '../../../../../common/model/Category';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StateService } from '../../../../../common/service/state.service';
import { ToastService } from '../../../../../common/service/toast.service';
import { CategoryService } from '../../../../../service/product/category.service';
import { LoaderComponent } from '../../../loader.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { success_message } from '../../../../../common/constant/messages';
import { AdminService } from '../../../../../service/admin/admin.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

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
               private categoryService: CategoryService,
               private toastService: ToastService,
               private stateService: StateService,
               public category: Category,
               private storage:  AdminService,
               private dialogRef: MatDialogRef<CategoryEditComponent>,
               @Inject(MAT_DIALOG_DATA) data,
               private ren: Renderer2,
               ) {
                 this.category = data.category;
             }

  public ngOnInit() {
    this.setStateCategory(this.category);
  }

  public setStateCategory(category: Category): void {
    this.stateService.setCategory(category);
  }
  public save() {
    this.loader.loading = true;
    this.category.updatedBy=this.storage.usersStorage().id;
    this.categoryService.updateCategory(this.stateService.getCategory()).subscribe
      (
        (response) => {
          this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loader.loading = false;
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
           this.loader.loading = false;
           console.log(this.category)
         });
  }

close() {
  this.dialogRef.close();
}
}
