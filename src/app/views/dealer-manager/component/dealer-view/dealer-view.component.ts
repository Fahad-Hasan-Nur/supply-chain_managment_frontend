import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Admin } from '../../../../common/model/admin';
import { ImageService } from '../../../../service/image/image.service';

@Component({
  selector: 'app-dealer-view',
  templateUrl: './dealer-view.component.html',
  styleUrls: ['./dealer-view.component.scss']
})
export class DealerViewComponent implements OnInit {

  public toolbarOptions;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public retrievedImage1: any;
  public base64Data1: any;
  public retrieveResonse1: any;
  public retrievedImage2: any;
  public base64Data2: any;
  public retrieveResonse2: any;
  constructor(
    public dealer: Admin,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<DealerViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.dealer = data.dealer;
  }
  ngOnInit() {
    this.getImage(this.dealer.imageId);
    this.getTinImage(this.dealer.tinId);
    this.getNidImage(this.dealer.nidId);
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
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
  private getTinImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse1 = response;
          this.base64Data1 = this.retrieveResonse1.picByte;
          this.retrievedImage1 = 'data:image/jpeg;base64,' + this.base64Data1;
        },
        (error) => console.log(error),
      );
  }
  private getNidImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse2 = response;
          this.base64Data2 = this.retrieveResonse2.picByte;
          this.retrievedImage2 = 'data:image/jpeg;base64,' + this.base64Data2;
        },
        (error) => console.log(error),
      );
  }
}
