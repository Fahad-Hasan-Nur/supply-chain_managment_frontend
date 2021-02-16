import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from '../../../../../../service/task/task.service';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-task.modal.html',
  styleUrls: ['./add-task.modal.scss']
})
export class AddTaskModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public fb: FormBuilder,
    protected snackbar: MatSnackBar,
    protected dialog: MatDialog,
    protected taskService: TaskService
  ) {
}
  ngOnInit() {}
  cancel() {
    this.dialogRef.close();
  }
  save(value){
     this.data =value;
     this.dialogRef.close(this.data);
  }
}
