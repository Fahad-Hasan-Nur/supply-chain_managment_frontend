import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { addYears } from 'date-fns';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TaskService } from '../../../../service/task/task.service';
import { Task } from '../../model/task';
@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {
  public data: Task;
  constructor(private router: Router) {}

  ngOnInit() {
  }

  save(){
    this.router.navigate(['/prj/prj-task-list'])
  }
}
