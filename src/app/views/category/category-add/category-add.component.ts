import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';
import { success_message } from '../../../common/constant/messages';
import { Brand } from '../../../common/model/brand';
import { Category } from '../../../common/model/Category';
import { StateService } from '../../../common/service/state.service';
import { ToastService } from '../../../common/service/toast.service';
import { AppBreadcrumbService } from '../../../core/breadcrumb/app-breadcrumb.service';
import { AdminService } from '../../../service/admin/admin.service';
import { CategoryService } from '../../../service/product/category.service';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss'],
})
export class CategoryAddComponent implements OnInit {

  @ViewChild(LoaderComponent, { static: false })

  public loader: LoaderComponent;
  public myFilter: any;

  constructor(
    public dialog: MatDialog,
    public appBarService: AppBreadcrumbService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private stateService: StateService,
    public data: Category,
    private storage: AdminService
    ) {
}

  public ngOnInit() {
    this.setStateCategory(this.data);
  }
  public setStateCategory(brand: Brand): void {
    this.stateService.setCategory(brand);
  }
  public save() {
    this.loader.loading = true;
    this.data.createdBy=this.storage.usersStorage().id;
    this.categoryService.addCategory(this.stateService.getCategory()).subscribe
        (
          (response) => {
            console.log(response);
            this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
            this.loader.loading = false;
          }, (error) => {
            console.log(error);
            this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
            this.loader.loading = false;
            console.log(error);
          });
  }

}
