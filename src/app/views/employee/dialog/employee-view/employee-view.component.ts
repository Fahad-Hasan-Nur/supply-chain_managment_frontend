import { Employee } from './../../../../common/model/employee';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ImageService } from '../../../../service/image/image.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Admin } from '../../../../common/model/admin';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  public toolbarOptions;
  private id: string;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  constructor(
    public admin: Admin,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<EmployeeViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.admin = data.employee;
  }
  ngOnInit() {
    this.getImage(this.admin.imageId);

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
