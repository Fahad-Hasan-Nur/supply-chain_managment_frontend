import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, HostListener, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { take } from 'rxjs/operators';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { MY_FORMATS } from '../../../../common/constant/global-variables.constant';
import { MomentUtcDateAdapter } from '../../../../common/service/MomentUtcDateAdapter';
import { ProjectService } from '../../../../service/project/project.service';
import { Project } from '../../model/project';

@Component({
  selector: 'app-prj-view',
  templateUrl: './prj-view.component.html',
  styleUrls: ['./prj-view.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class PrjViewComponent implements OnInit {

  public toolbarOptions;
  private id: string;
  public estimatedTime: string;
  // WIll be deleted
  public adp = '৯৩০.৭৩ লক্ষ টাকা (২৭.৩৩ %) ' ;
  public advance = 'ক্রমপুঞ্জিত ব্যয় : ৯৬২.১৮ লক্ষ টাকা ( ২৮.২৬ %)';
  public data = 'বরাদ্দ: ১৮৯৬২.১৮,  অবমুক্ত: ৯৬২.১৮ , ব্যয়: ২৮.২৬';
// ....................
  constructor(public fb: FormBuilder,
              public prjData: Project,
              private service: ProjectService,
              public prj: Project,
              private ngZone: NgZone,
              private dialogRef: MatDialogRef<PrjViewComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private ren: Renderer2,
  ) {
      this.id = data.prjId;
  }
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  @ViewChild('cfcAutosize', {static: false})
  public contentFCAutosize: CdkTextareaAutosize;

  resizeTextArea() {
    this.ngZone.onStable.pipe(take(1))
    .subscribe(() => this.contentFCAutosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.display();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
}
  display() {
    this.service.getPrjOverview(this.id).subscribe
      (
        (response) => {
          this.prj = response;
          this.estimatedTime = this.prj.startDate + ' থেকে ' + this.prj.finishDate;
          console.log(this.prj);
        },
        (error) => console.log(error),
      );
  }

}
