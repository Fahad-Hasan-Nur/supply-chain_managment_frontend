import { SubCategory } from './../../../../common/model/sub-category';
import { Component, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { SubCategoryService } from '../../../../service/product/sub-category.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sub-category-view',
  templateUrl: './sub-category-view.component.html',
  styleUrls: ['./sub-category-view.component.scss']
})
export class SubCategoryViewComponent implements OnInit {

  public toolbarOptions;
 // private id: string;

  constructor(
    public subCategory: SubCategory,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<SubCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.subCategory = data.subCategory;
  }
  @ViewChild('cfcAutosize', {static: false})
  public contentFCAutosize: CdkTextareaAutosize;
  
  @HostListener('window:keyup.esc') public onKeyUp() {
    this.dialogRef.close();
  }

  public resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
}
}
