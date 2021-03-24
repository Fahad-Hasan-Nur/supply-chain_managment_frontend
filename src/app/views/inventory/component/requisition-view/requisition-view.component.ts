import { ProductService } from './../../../../service/product/product.service';
import { Requisition } from './../../../../common/model/requisition';
import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from '../../../../service/image/image.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Product } from '../../../../common/model/product';

@Component({
  selector: 'app-requisition-view',
  templateUrl: './requisition-view.component.html',
  styleUrls: ['./requisition-view.component.scss']
})
export class RequisitionViewComponent implements OnInit {

  public toolbarOptions;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public product: Product;
  constructor(
    public requisition: Requisition,
    private imageService: ImageService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<RequisitionViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.requisition = data.requisition;
      // this.getProduct(this.requisition.productId);
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
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
  private getProduct(id) {
    this.productService.getProductById(id).subscribe
      (
        (response) => {
          this.product = response;
          this.getImage(this.product.imageId);
        },
        (error) => console.log(error),
      );
  }
}
