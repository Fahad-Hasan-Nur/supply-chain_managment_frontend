import { AdminService } from './../../../../service/admin/admin.service';
import { ProductViewComponent } from './../product-view/product-view.component';
import { ToastService } from './../../../../common/service/toast.service';
import { StateService } from './../../../../common/service/state.service';
import { ProductService } from './../../../../service/product/product.service';
import { Variation } from './../../../../common/model/variation';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../../../common/model/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { success_message } from '../../../../common/constant/messages';
import { LoaderComponent } from '../../loader.component';
import { URL } from '../../../../common/constant/nav.constant';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.scss']
})
export class VariationComponent implements OnInit {
  
  @ViewChild(MatSort, {static: true}) public sort: MatSort;
  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

    public toolbarOptions;
    myControl = new FormControl();
    filteredOptions: Observable<string[]>;

  private id: string;
  public view:boolean=false;
  public disable:boolean=false;
  public update:boolean=false;
  public displayedColumns: string[] = ['Name', 'Price', 'Quantity', 'Discount', 'action'];
  public sizeData: string[]=['S (Small)','M (Medium)','L (Large)','XL (Extra Large)','XXL (Extra Large)','250ml','500ml','1L','2L','5L'];
  public dataSource = new MatTableDataSource;
  public var: Variation[]=[];

  constructor(
    private storage: AdminService,
    public product: Product,
    private productService: ProductService,
    private toastService:ToastService,
    private stateService:StateService,
    public variation: Variation,
     private service: ProductService,
    private dialogRef: MatDialogRef<VariationComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.product = data.data;
    if(this.product.id!=null){
      this.getDetails();
    }
    console.log(this.product)
  }

  ngOnInit() {
   this.set();
   this.dataSource.sort=this.sort;
  }
 private set(){
  this.filteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value))
  );
 }
 formatLabel(value: number) {
  if (value >= 1) {
    return value + '%';
  }
  return value;
}
  private _filter(value: string): string[] {
    return this.sizeData.filter(option => option.toLowerCase().includes(value));
  }
  close() {
    this.dialogRef.close();
  }

  save() {
     this.loader.loading = true;
     this.productService.addProduct(this.product).subscribe
    (
      (response) => {
        console.log(response);
        this.product=response;
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
       this.loader.loading = false;
        this.saveVar(this.product);
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loader.loading = false;
      });
  }

  addVariation() {
    this.var.push(this.variation)
     this.dataSource.data=this.var as Variation[];
     this.view=true;
     this.variation=new Variation();
     this.set();
  }
  saveVar(data:Product){
    this.var.push(this.variation)
    this.var.forEach(element => {
      element.createdBy=this.storage.usersStorage().id;;
      element.productId=data.id;
    });
    console.log(this.var)
    this.productService.addVariation(this.var).subscribe
    (
      (response) => {
        console.log(response);
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
        window.location.replace(window.location.href.replace(URL.PRODUCT_ADD, URL.PRODUCT_LIST));

      }, (error) => {
        this.var.pop;
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loader.loading = false;
      });
  }
  remove(data:Variation){
  }
  private getDetails(){
    this.productService.getVariations(this.product.id).subscribe
    (
      (response) => {
        this.var=response;
        this.view=true;
        this.dataSource.data=this.var as Variation[];
        this.update=true;
        this.disable=true;
        console.log(this.var)

      }, (error) => {
        console.log(error);
      });
  }
  updateData(data:Variation){
     this.variation=data;
     this.disable=false;
     console.log(this.variation)
  }
  updateNow(){
    this.loader.loading=true;
    console.log(this.variation)
    this.productService.updateVariation(this.variation).subscribe(
      (res)=>{
        console.log(res);
        this.getDetails();
        this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading=false;
      },
      (error)=>{
        this.loader.loading=false;
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);

      }
    )
  }


}
