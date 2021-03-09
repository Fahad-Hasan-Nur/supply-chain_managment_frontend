import { SubCategoryViewComponent } from './../dialog/sub-category-view/sub-category-view.component';
import { SubCategory } from './../../../common/model/sub-category';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../common/constant/nav.constant';
import { SubCategoryService } from '../../../service/product/sub-category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss'],
})
export class SubCategoryListComponent implements OnInit {

  constructor( private service: SubCategoryService, public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public subCategory: SubCategory[] = [];
  public displayedColumns: string[] = ['Name', 'Category', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public prjId: string;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getSubCAtegory().subscribe
      (
        (response) => {
          this.subCategory = response;
          this.dataSource.data = response as SubCategory[];
          console.log(this.subCategory);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }
  public viewAddSubCategoryPage() {
    this.router.navigateByUrl(URL.SUB_CATEGORY_ADD);
  }
  
  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        subCategory: data
    };
    this.dialog.open(SubCategoryViewComponent, dialogConfig);
  }

}
