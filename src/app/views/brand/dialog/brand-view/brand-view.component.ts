import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { take } from 'rxjs/operators';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Brand } from '../../../../common/model/brand';
import { ImageService } from '../../../../service/image/image.service';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.scss'],
})
export class BrandViewComponent implements OnInit {
  constructor(
    public brand: Brand,
    private imageService: ImageService,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<BrandViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.brand = data.brand;
      }

  public toolbarOptions;
  private id: string;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  @ViewChild('cfcAutosize')
  public contentFCAutosize: CdkTextareaAutosize;
  public ngOnInit() {
    this.getImage(this.brand.imageId);
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  @HostListener('window:keyup.esc') public onKeyUp() {
    this.dialogRef.close();
  }

  public resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }
  public close() {
    this.dialogRef.close();
  }
  public getImage(id) {
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
