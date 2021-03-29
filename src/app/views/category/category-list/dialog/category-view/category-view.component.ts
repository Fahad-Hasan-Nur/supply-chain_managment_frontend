import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, HostListener, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../../common/constant/editor.constants';
import { Category } from '../../../../../common/model/category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {

  public toolbarOptions;
  constructor(
    public category: Category,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<CategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.category = data.category;
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  @ViewChild('cfcAutosize')
  public contentFCAutosize: CdkTextareaAutosize;

  @HostListener('window:keyup.esc') public onKeyUp() {
    this.dialogRef.close();
  }
  public resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }
  close() {
    this.dialogRef.close();
}
}
