import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Brand } from '../../../../common/model/brand';
import { ImageService } from '../../../../service/image/image.service';
import { BrandService } from '../../../../service/product/brand.service';


@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.scss']
})
export class BrandViewComponent implements OnInit {

  public toolbarOptions;
  private id: string;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(
    public brand: Brand,
    private service: BrandService,
    private imageService: ImageService,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<BrandViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      
      this.id = data.brandId;
      console.log(data.brandId)
  }
  ngOnInit() {
    this.display();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
}
  display() {
    this.service.getBrandById(this.id).subscribe
      (
        (response) => {
          this.brand = response;
          this.getImage(this.brand.imageId);
          console.log(this.brand);
        },
        (error) => console.log(error),
      );
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
