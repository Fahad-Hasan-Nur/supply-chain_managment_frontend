import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material';
import * as _ from 'lodash';
import { success_message } from '../../../common/constant/messages';
import { Brand } from '../../../common/model/brand';
import { Category } from '../../../common/model/Category';
import { Product } from '../../../common/model/product';
import { SubCategory } from '../../../common/model/sub-category';
import { StateService } from '../../../common/service/state.service';
import { ToastService } from '../../../common/service/toast.service';
import { ImageService } from '../../../service/image/image.service';
import { BrandService } from '../../../service/product/brand.service';
import { CategoryService } from '../../../service/product/category.service';
import { ProductService } from '../../../service/product/product.service';
import { SubCategoryService } from '../../../service/product/sub-category.service';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {

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

  constructor(
               public dialog: MatDialog,
               private productService: ProductService,
               private brandService: BrandService,
               private categoryService: CategoryService,
               private imageService: ImageService,
               private subCategoryService: SubCategoryService,
               private toastService: ToastService,
               private stateService: StateService,
               public data: Product,
               ) {
}

  public ngOnInit() {
    this.setStateProject(this.data);
    this.getCategory();
    this.getBrand();
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
    this.data.categoryId = value;
  }
  public onSelectBrand(value: string): void {
    this.data.brandId = value;
  }
  public onSelectSubCategory(value: string): void {
    this.data.subCategoryId = value;
  }

  public setStateProject(product: Product): void {
    this.stateService.setProduct(product);
  }
  public save() {
    this.loader.loading = true;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageService.uploadImage(uploadImageData).subscribe
    (
      (response) => {
        this.retrieveResonse=response;
        console.log(this.retrieveResonse);
        this.data.imageName=this.retrieveResonse.name;
        this.data.imageId=this.retrieveResonse.id;
        this.saveData();

      }, (error) => {
        this.saveData();
        console.log(error);
      });
  }
  public fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 2097000;
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
private saveData(){  
  this.data.createdBy="Fahad";
  this.productService.addProduct(this.stateService.getProduct()).subscribe
    (
      (response) => {
        console.log(response);
        this.toastService.openSnackBar(success_message.CREATED_SUCCESSFULLY, this.toastService.ACTION_SUCESS, this.toastService.CLASS_NAME_SUCESS);
        this.loader.loading = false;
      }, (error) => {
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loader.loading = false;
        console.log(this.data);
      });
}

public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.selectedFile = null;
}
}
