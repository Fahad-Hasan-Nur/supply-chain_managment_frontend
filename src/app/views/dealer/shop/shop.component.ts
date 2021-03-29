import { RequisitionProduct } from './../../../common/model/requisition-product';
import { VariationComponent } from './../../product/component/variation/variation.component';
import { URL } from './../../../common/constant/nav.constant';
import { Router } from '@angular/router';
import { Transaction } from './../../../common/model/transaction';
import { AdminService } from './../../../service/admin/admin.service';
import { Requisition } from './../../../common/model/requisition';
import { Product } from './../../../common/model/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { success_message } from '../../../common/constant/messages';
import { Brand } from '../../../common/model/brand';
import { Category } from '../../../common/model/Category';
import { SubCategory } from '../../../common/model/sub-category';
import { LoaderComponent } from '../loader.component';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ProductService } from '../../../service/product/product.service';
import { CategoryService } from '../../../service/product/category.service';
import { ImageService } from '../../../service/image/image.service';
import { SubCategoryService } from '../../../service/product/sub-category.service';
import { ToastService } from '../../../common/service/toast.service';
import { StateService } from '../../../common/service/state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DealerService } from '../../../service/dealer/dealer.service';
import { PaymentComponent } from '../component/payment/payment.component';
import { Variation } from '../../../common/model/variation';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public allReq: RequisitionProduct[] = [];
  public displayedColumns: string[] = ['Product Name', 'Size', 'Cartoon Size', 'Cartoon Per Lot', 'Cost', 'action'];
  public dataSource = new MatTableDataSource;
  public loading: boolean;
  public res: Requisition;
  public available: boolean = true;
  public message: string;
  public discount: number = 0;
  private pay: boolean = false;
  private totalcost: number = 0;

  public req: Requisition[] = [];
  public tran: Transaction[] = [];

  public price: number = 1;
  private id: number = 1;
  public showSubCategory: boolean = true;
  public showProduct: boolean = true;
  public showAll: boolean = true;
  public view: boolean = true;
  public list: boolean = false;


  public div: string = "col-md-12";
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public sizeList: Variation[] = [];
  public brandList: Brand[] = [];
  public categoryList: Category[] = [];
  public subCategoryList: SubCategory[] = [];
  public productList: Product[] = [];
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(
    private storage: AdminService,
    public dialog: MatDialog,
    private dealerService: DealerService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private subCategoryService: SubCategoryService,
    private toastService: ToastService,
    private stateService: StateService,
    public requisition: Requisition,
    public data: RequisitionProduct,
    public a: Product,
    private router: Router
  ) {
  }

  public ngOnInit() {
    this.getCategory();
    this.check();
  }

  public getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryList = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  public getSubCategory(value: string) {
    this.subCategoryService.getSubCategoryByCategoryId(value).subscribe((data) => {
      this.subCategoryList = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  public onSelectCategory(value: string): void {
    this.showSubCategory = false;
    this.getSubCategory(value);
  }

  public onSelectProduct(value: Product): void {
    this.data.productName = value.name;
    this.div = "leftdv";
    this.getVariation(value.id);
    this.a = value;
    this.getImage(value.imageId);
    console.log(this.a);
    this.showAll = false;

  }

  public onSelectSize(value: Variation): void {
    this.price = value.price;
    this.discount = value.discount;
    this.data.variationId = value.id;
    this.data.variationName = value.name;
    this.data.totalCost = Math.round((value.price - value.price * (value.discount / 100)) * this.data.cartoonPerLot * this.data.cartoonSize);
  }
  private getVariation(id: string) {
    this.productService.getVariations(id).subscribe(
      (res) => this.sizeList = res,
      (error) => console.log
    )
  }

  public onSelectSubCategory(value: string): void {
    this.showProduct = false;
    this.getProductBySubCategory(value);
  }

  public getProductBySubCategory(value: string) {
    this.productService.getProductBySubCategoryId(value).subscribe((data) => {
      this.productList = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  public setStateRequisition(data: Requisition): void {
    this.stateService.setRequisition(data);
  }

  private getImage(id) {
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

  public addToCart() {
    this.check();
    if (this.available == true) {
      this.loading = true;
      this.requisition.status = "cart";
      this.saveData();
    }

  }
  public payNow() {
    this.check();
    if (this.available == true) {
      this.requisition.status = "cart";
      this.pay = true;
      this.saveData();
    }
  }

  private saveData() {
    this.requisition.createdBy = this.storage.usersStorage().id;
    this.requisition.userId = this.storage.usersStorage().id;
    this.allReq.forEach(element => {
      this.totalcost=this.totalcost+element.totalCost;
    });
    this.requisition.totalCost = this.totalcost;
    this.dealerService.addRequisition(this.requisition).subscribe
      (
        (response) => {
          this.res=response;
          this.saveRequisitionProduct(this.res.id);
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loading = false;
        });
  }

  private saveRequisitionProduct(id:string){
    this.allReq.forEach(element => {
      element.requisitionId=id;
    });
    this.dealerService.addRequisitionProduct(this.allReq).subscribe(
      (response)=>{
          this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loading = false;
          if(this.pay==true){
            this.openDialogPayNow(this.res);
          }
      },
      (error)=>{
        this.loading=false;
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        console.log(error);
      }
    );
  }
  addMore() {
    this.data.createdBy = this.storage.usersStorage().id;
    this.allReq.push(this.data)
    this.dataSource.data = this.allReq as RequisitionProduct[];
    this.view = false;
    this.a = new Product();
    console.log(this.a)
    this.data = new RequisitionProduct();
    this.sizeList = [];
    this.productList = [];
    this.subCategoryList = [];
    this.discount = 0;
    this.price = 1;
    this.showAll = true;
    this.div = "col-md-12"
    this.showProduct = true;
    this.showSubCategory = true;
    this.list = true;
  }

  openDialogPayNow(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      requisition: data
    };
    this.dialog.open(PaymentComponent, dialogConfig);
  }
  private check() {
    this.dealerService.getOnCartRequisition(this.storage.usersStorage().id).subscribe
      (
        (response) => {
          this.req = response;
          if (this.req.length < 1) {
            this.checkTransaction();
            console.log("req is null")
          } else {
            this.available = false;
            this.message = "Complete or Delete Cart Requisition First"
          }
          console.log(response)
        },
        (error) => console.log(error),
      );
  }

  private checkTransaction() {
    this.dealerService.getTransactionByUser(this.storage.usersStorage().id).subscribe
      (
        (response) => {
          this.tran = response;
          if (this.tran.length > 0) {
            this.tran.forEach(element => {
              if (this.id == 1) {
                if (element.due == 0) {
                  if (element.status == "Complete") {
                    this.available = true;
                    this.id = 2;
                  } else {
                    this.message = "Your Transaction is not Processed Yet.."
                    this.available = false;
                    this.id = 2;
                  }

                } else {
                  this.message = "You Have to clear Your Due for New Requisition."
                  this.available = false;
                  this.id = 2;
                }
              }
              console.log(response)
            });
          } else {
            this.available = true;
          }
        },
        (error) => console.log(error),
      );
  }

}
