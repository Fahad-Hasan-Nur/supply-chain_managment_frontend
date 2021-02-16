import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../../common/constant/editor.constants';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  public toolbarOptions;
  public myFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    public fb: FormBuilder,
    protected snackbar: MatSnackBar,
    protected dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      name: new FormControl(''),
      office: new FormControl(''),
    });
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }

  cancel() {
    this.dialogRef.close();
  }

}

