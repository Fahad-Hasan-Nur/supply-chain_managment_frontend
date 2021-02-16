import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { TaskService } from '../../../../../../service/task/task.service';

import { Task } from '../../../../model/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task: Task;
  constructor(   
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public fb: FormBuilder,
    protected service: TaskService,
    protected snackbar: MatSnackBar,
    protected dialog: MatDialog) { }

  ngOnInit() {
    this.task = this.data;
  }
  cancel() {
    this.dialogRef.close();
  }
}
