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
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductService } from '../../../service/product/product.service';
import { CategoryService } from '../../../service/product/category.service';
import { ImageService } from '../../../service/image/image.service';
import { SubCategoryService } from '../../../service/product/sub-category.service';
import { ToastService } from '../../../common/service/toast.service';
import { StateService } from '../../../common/service/state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DealerService } from '../../../service/dealer/dealer.service';
import { PaymentComponent } from '../component/payment/payment.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild(LoaderComponent, { static: false })
  public loader: LoaderComponent;
  public loading: boolean;
  public res:Requisition;
  public available:boolean;
  private pay:boolean=false;
  public req: Requisition[]=[];
  public tran: Transaction[]=[];

  public price: number;
  private id:number=1;
  public showSubCategory: boolean = true;
  public showProduct: boolean = true;
  public showAll: boolean = true;
  public div: string = "col-md-12";
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public sizeList: string[] = [];
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
    public data: Requisition,
    public a: Product,
    private router:Router
  ) {
  }

  public ngOnInit() {
    this.setStateRequisition(this.data);
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
    this.div = "leftdv";
    this.sizeList = value.size;
    this.price = value.price;
    this.a = value;
    this.getImage(value.imageId);
    console.log(this.a);
    this.showAll = false;

  }

  public onSelectSize(value: string): void {
    this.data.size = value;
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
    if(this.available==true){
      this.loading = true;
      this.data.status = "cart";
      this.saveData();
    }
   // this.router.navigateByUrl(URL.DEALER_CART);

  }
  public payNow() {
    this.check();
    if(this.available==true){
      this.data.status = "cart";
      this.pay=true;
      this.saveData();
    } 
  }

  private saveData() {
    this.data.createdBy = this.storage.usersStorage().id;
    this.data.userId = this.storage.usersStorage().id;
    this.data.totalCost = this.data.cartoonPerLot * this.data.cartoonSize * this.price;
    this.dealerService.addRequisition(this.stateService.getRequisition()).subscribe
      (
        (response) => {
          console.log(response);
          this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
          this.loading = false;
          this.res=response;
          if(this.pay==true){
            this.openDialogPayNow(this.res);
          }
        }, (error) => {
          console.log(error);
          this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
          this.loading = false;
        });
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
  private check(){
    this.dealerService.getOnCartRequisition(this.storage.usersStorage().id).subscribe
    (
      (response) => {
        this.req=response;
        if(this.req.length<1){
          this.checkTransaction();
          console.log("req is null")
        }else{
          this.available=false;
        }
        console.log(response)
      },
      (error) => console.log(error),
    );  
  }

  private checkTransaction(){
    this.dealerService.getTransactionByUser(this.storage.usersStorage().id).subscribe
    (
      (response) => {
        this.tran=response;
        if(this.tran.length>0){
          this.tran.forEach(element => {
            if(this.id==1){
              if(element.due==0){
                this.available=true;
                this.id=2;
              }else{
                this.available=false;
                this.id=2;
              }
            }
            console.log(response)
          });
        }else{
          this.available=true;
        }
      },
      (error) => console.log(error),
    ); 
  }

}
