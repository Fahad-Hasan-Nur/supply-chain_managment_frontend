import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Product } from '../../../../common/model/product';
import { ImageService } from '../../../../service/image/image.service';
import { ProductService } from '../../../../service/product/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public toolbarOptions;
  private id: string;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(
    public product: Product,
    private service: ProductService,
    private imageService: ImageService,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<ProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.product = data.product;
  }
  ngOnInit() {
    this.getImage(this.product.imageId);

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
}
