import { SubCategory } from './../../../../common/model/sub-category';
import { SubCategoryService } from './../../../../service/product/sub-category.service';
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LoaderComponent } from '../../loader.component';
import { ToastService } from '../../../../common/service/toast.service';
import { StateService } from '../../../../common/service/state.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { success_message } from '../../../../common/constant/messages';
import { CategoryService } from '../../../../service/product/category.service';
import { Category } from '../../../../common/model/Category';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../../../service/admin/admin.service';

@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.scss']
})
export class SubCategoryEditComponent implements OnInit {

  public categoryList: Category[] = [];

  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private toastService: ToastService,
    private stateService: StateService,
    public subCategory: SubCategory,
    private storage: AdminService,
    private dialogRef: MatDialogRef<SubCategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
  ) {
    this.subCategory = data.subCategory;
  }

  public ngOnInit() {
    this.setStateSubCategory(this.subCategory);
    this.getCategory();
  }

  public getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryList = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }
  public setStateSubCategory(subCategory: SubCategory): void {
    this.stateService.setSubCategory(subCategory);
  }
  public onSelectCategory(value: string): void {
    this.subCategory.categoryName = value;
  }
  public save() {
    this.loader.loading = true;
    this.subCategory.updatedBy = this.storage.usersStorage().id;
    this.subCategoryService.updateSubCategory(this.stateService.getSubCategory()).subscribe
      (
        (response) => {
          this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loader.loading = false;
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
           this.loader.loading = false;
           console.log(this.stateService.getSubCategory())
        });
  }

  close() {
    this.dialogRef.close();
  }

}
