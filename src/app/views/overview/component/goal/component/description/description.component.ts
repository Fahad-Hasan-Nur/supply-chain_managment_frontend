import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  public name : string;
  public description : string="সহস্রাব্দ উন্নয়ন লক্ষ্যমাত্রা (এমডিজি) অর্জনে অসামান্য সাফল্যের জন্য বাংলাদেশ বিশ্ব উন্নয়ন সম্প্রদায়ের কাছ থেকে প্রশংসা অর্জন করেছে, বিশেষ করে সার্বজনীন প্রাথমিক শিক্ষার লক্ষ্য অর্জন, শিশু মৃত্যু হ্রাস, লিঙ্গ সমতা এবং নারীর ক্ষমতায়ন।";
  constructor(
    private dialogRef: MatDialogRef<DescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
) {
this.name = data.name;
}

  ngOnInit() {
  }
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
  close(){
    this.dialogRef.close();
  }

}
