import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { success_message } from '../../../../common/constant/messages';
import { Brand } from '../../../../common/model/brand';
import { Category } from '../../../../common/model/Category';
import { Product } from '../../../../common/model/product';
import { SubCategory } from '../../../../common/model/sub-category';
import { StateService } from '../../../../common/service/state.service';
import { ToastService } from '../../../../common/service/toast.service';
import { ImageService } from '../../../../service/image/image.service';
import { BrandService } from '../../../../service/product/brand.service';
import { CategoryService } from '../../../../service/product/category.service';
import { ProductService } from '../../../../service/product/product.service';
import { SubCategoryService } from '../../../../service/product/sub-category.service';
import { LoaderComponent } from '../../loader.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {


  @ViewChild(LoaderComponent, { static: false }) public loader: LoaderComponent;

  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public brandList: Brand[] = [];
  public categoryList: Category[] = [];
  public subCategoryList: SubCategory[] = [];
  public myFilter: any;
  public selectedFile: File;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public message: string;
  public imageName: any;
  public sizeData: string[]=['S (Small)','M (Medium)','L (Large)','XL (Extra Large)','250ml','500ml','1L','2L','5L'];


  constructor(
               private productService: ProductService,
               private brandService: BrandService,
               private categoryService: CategoryService,
               private imageService: ImageService,
               private subCategoryService: SubCategoryService,
               private toastService: ToastService,
               private stateService: StateService,
               public product: Product,
               private ngZone: NgZone,
               private dialogRef: MatDialogRef<ProductEditComponent>,
               @Inject(MAT_DIALOG_DATA) data,
               private ren: Renderer2,
               ) {
                 this.product = data.product;
             }

  public ngOnInit() {
    this.setStateProject(this.product);
    this.getCategory();
    this.getSubCategory(this.product.categoryId);
    this.getBrand();
    this.getImage(this.product.imageId);
  }
  public getCategory() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categoryList = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }
  public getBrand() {
    this.brandService.getBrand().subscribe((data) => {
      this.brandList = data;
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
    this.getSubCategory(value);
    this.product.categoryName = value;
  }
  public onSelectBrand(value: string): void {
    this.product.brandName = value;
  }
  public onSelectSubCategory(value: string): void {
    this.product.subCategoryName = value;
  }

  public setStateProject(product: Product): void {
    this.stateService.setProduct(product);
  }
  public save() {
    this.loader.loading = true;
    if(this.selectedFile!=null){
      this.saveImage();
    }else{
      this.saveData();
    }
  }
  public fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 2097000/5;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 300;
        const max_width = 300;

        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
        }
        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];
              if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
        this.selectedFile = fileInput.target.files[0];
    }
}
private saveImage(){
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  this.imageService.uploadImage(uploadImageData).subscribe
  (
    (response) => {
      this.retrieveResonse=response;
      console.log(this.retrieveResonse);
      this.product.imageName=this.retrieveResonse.name;
      this.product.imageId=this.retrieveResonse.id;
      this.saveData();

    }, (error) => {
      this.saveData();
      console.log(error);
    });
}
private saveData(){
  this.product.updatedBy="Fahad";
  this.productService.updateProduct(this.stateService.getProduct()).subscribe
    (
      (response) => {
        console.log(response);
        this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
         this.loader.loading = false;
         console.log(this.product)
       });
}

public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.selectedFile = null;
}
close() {
  this.dialogRef.close();
}
getImage(id) {
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
}