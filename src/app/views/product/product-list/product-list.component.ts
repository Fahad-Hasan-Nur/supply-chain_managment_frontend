import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { URL } from '../../../common/constant/nav.constant';
import { Product } from '../../../common/model/product';
import { ProductService } from '../../../service/product/product.service';
import { ProductViewComponent } from '../component/product-view/product-view.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  constructor(private http: HttpClient, private service: ProductService, public route: Router, protected dialog: MatDialog) { }
  public router: Router;
  public product: Product[] = [];
  public displayedColumns: string[] = ['Name', 'Category', 'Sub-Category', 'Brand', 'Quantity', 'Price', 'action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  public prjId: string;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getProducts().subscribe
      (
        (response) => {
          this.product = response;
          this.dataSource.data = response as Product[];
          console.log(this.product);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }
  public viewAddProductPage() {
    this.router.navigateByUrl(URL.PRODUCT_ADD);
  }
  
  openDialogView(id?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        productId: id
    };
    this.dialog.open(ProductViewComponent, dialogConfig);
  }

}
