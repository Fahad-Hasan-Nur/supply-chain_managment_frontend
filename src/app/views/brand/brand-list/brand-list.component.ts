import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../common/constant/nav.constant';
import { Brand } from '../../../common/model/brand';
import { BrandService } from '../../../service/product/brand.service';
import { BrandEditComponent } from '../dialog/brand-edit/brand-edit.component';
import { BrandViewComponent } from '../dialog/brand-view/brand-view.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  constructor(private http: HttpClient, private service: BrandService, public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public brand: Brand[] = [];
  public displayedColumns: string[] = ['Name', 'Code', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public brandId: string;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getBrand().subscribe
      (
        (response) => {
          this.brand = response;
          this.dataSource.data = response as Brand[];
          console.log(this.brand);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }
  public viewAddBrandPage() {
    this.router.navigateByUrl(URL.BRAND_ADD);
  }
  
  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        brand: data
    };
    this.dialog.open(BrandViewComponent, dialogConfig);
  }

  openDialogEdit(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        brand: data
    };
    this.dialog.open(BrandEditComponent, dialogConfig);
  }
}
