import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../common/constant/nav.constant';
import { Category } from '../../../common/model/Category';
import { CategoryService } from '../../../service/product/category.service';
import { CategoryEditComponent } from './dialog/category-edit/category-edit.component';
import { CategoryViewComponent } from './dialog/category-view/category-view.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor( private service: CategoryService, public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public category: Category[] = [];
  public displayedColumns: string[] = ['Name', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public brandId: string;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getCategory().subscribe
      (
        (response) => {
          this.category = response;
          this.dataSource.data = response as Category[];
          console.log(this.category);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {}

  
  public viewAddBrandPage() {
    this.router.navigateByUrl(URL.CATEGORY_ADD);
  }
  
  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        category: data
    };
    this.dialog.open(CategoryViewComponent, dialogConfig);
  }
  openDialogEdit(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        category: data
    };
    this.dialog.open(CategoryEditComponent, dialogConfig);
  }

}
