import { SubCategory } from './../../../common/model/sub-category';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { Category } from '../../../common/model/category';
import { StateService } from '../../../common/service/state.service';
import { ToastService } from '../../../common/service/toast.service';
import { CategoryService } from '../../../service/product/category.service';
import { SubCategoryService } from '../../../service/product/sub-category.service';
import { LoaderComponent } from '../loader.component';
import { HttpErrorResponse } from '@angular/common/http';
import { success_message } from '../../../common/constant/messages';
import { AdminService } from '../../../service/admin/admin.service';


@Component({
  selector: 'app-sub-category-add',
  templateUrl: './sub-category-add.component.html',
  styleUrls: ['./sub-category-add.component.scss'],
})
export class SubCategoryAddComponent implements OnInit {

  @ViewChild(LoaderComponent,{static:true}) public loader: LoaderComponent;

  public categoryList: Category[] = [];
  public myFilter: any;
  
  constructor(
               public dialog: MatDialog,
               private categoryService: CategoryService,
               private subCategoryService: SubCategoryService,
               private toastService: ToastService,
               private stateService: StateService,
               private storage: AdminService,
               public data: SubCategory,
               ) {
}

  public ngOnInit() {
    this.setStateSubCategory(this.data);
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
 
  public onSelectCategory(value: string): void {
    this.data.categoryId = value;
  }

  public setStateSubCategory(subCategory: SubCategory): void {
    this.stateService.setSubCategory(subCategory);
  }
  public save() {
    this.loader.loading = true;
    this.data.createdBy=this.storage.usersStorage().id;
    this.subCategoryService.addSubCategory(this.stateService.getSubCategory()).subscribe
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
}