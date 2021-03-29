import { AdminService } from './../../../service/admin/admin.service';
import { VariationComponent } from './../component/variation/variation.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MatDialogConfig} from '@angular/material';
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
import { FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Black', 'Red', 'Green', 'Blue', 'White'];

  @ViewChild('fruitInput',{ static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{ static: false }) matAutocomplete: MatAutocomplete;




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



               public dialog: MatDialog,
               private productService: ProductService,
               private brandService: BrandService,
               private categoryService: CategoryService,
               private imageService: ImageService,
               private subCategoryService: SubCategoryService,
               private toastService: ToastService,
               private stateService: StateService,
               public data: Product,
               private storage: AdminService
               ) {
                this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
                  startWith(null),
                  map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
}
add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add our fruit
  if ((value || '').trim()) {
    this.fruits.push(value.trim());
  }

  // Reset the input value
  if (input) {
    input.value = '';
  }

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);

  if (index >= 0) {
    this.fruits.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
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
  }
  public onSelectBrand(value: string): void {
    this.data.brandName = value;
  }
  public onSelectSubCategory(value: string): void {
    this.data.subCategoryName = value;
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
private saveData(){  
  this.data.color=this.fruits;
  this.data.createdBy = this.storage.usersStorage().id;
  this.loader.loading = false;
  this.openVariation(this.data);
}
public openVariation(data?){

  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        data: data
    };
    this.dialog.open(VariationComponent, dialogConfig);
}

public removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.selectedFile = null;
}
}
