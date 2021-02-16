import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DATE_FORMATS, MatDialog, MatSnackBar} from '@angular/material';
import {addYears} from 'date-fns';
import { Observable, pipe, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuillEditorComponent } from '../../../common/component/editor/quill-editor.component';
import {EDITOR_OPTIONS_MEDIUM} from '../../../common/constant/editor.constants';
import { FilterService } from '../../../common/service/filter.service';
import { AppBreadcrumbService } from '../../../core/breadcrumb/app-breadcrumb.service';
import { OfficeService } from '../../../service/office/office.service';
import { OfficeBrief } from '../../prj-planning/model/officeBrief';
import { Article } from '../model/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {

  @ViewChild(QuillEditorComponent, {static: false}) public editorText: QuillEditorComponent;

  public toolbarOptions;
  public myFormGroup: FormGroup;
  public title = 'অনুচ্ছেদ বর্ণনা লিখুন';
  public text: any;
  public data: Article;
  constructor( public fb: FormBuilder,
               public dialog: MatDialog,
               public appBarService: AppBreadcrumbService,
               private officeService: OfficeService,
               ) {
}

  ngOnInit() {
    this.reactiveForm();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  reactiveForm() {
    this.data = new Article();
    this.myFormGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
      template: [this.data.template, [Validators.required]],
      type: [this.data.type, [Validators.required]],
      description: [this.data.description, [Validators.required]],
    });
  }
  save() {
      this.data.name = this.myFormGroup.controls.name.value
      this.data.template = this.myFormGroup.controls.template.value;
      this.data.type = this.myFormGroup.controls.type.value;
      this.data.description = this.editorText.editorText;
      console.log(this.data);
    }

}
