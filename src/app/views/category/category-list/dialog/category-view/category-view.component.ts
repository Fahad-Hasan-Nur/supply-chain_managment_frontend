import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../../common/constant/editor.constants';
import { Category } from '../../../../../common/model/Category';
import { CategoryService } from '../../../../../service/product/category.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {

  public toolbarOptions;
  private id: string;
  constructor(
    public category: Category,
    private service: CategoryService,
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<CategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.id = data.categoryId;

  }
  ngOnInit() {
    this.display();
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
}
  display() {
    this.service.getCategoryById(this.id).subscribe
      (
        (response) => {
          this.category = response;
          console.log(this.category);
        },
        (error) => console.log(error),
      );
  }
}
