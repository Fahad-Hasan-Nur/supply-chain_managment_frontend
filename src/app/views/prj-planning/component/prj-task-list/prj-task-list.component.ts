import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSort,
} from '@angular/material';
import { Router } from '@angular/router';
import {
  Node,
} from '../../model/models';

import { Task } from '../../model/task';
import { AddTaskModalComponent } from './modal/add/add-task.modal';
import { TaskDetailsComponent } from './modal/task-details/task-details.component';
import { StorageService } from '../../../../common/service/storage/storage.service';
import { PROJECT } from '../../../../common/constant/global-variables.constant';
import {TreeService} from "../../services/tree/tree.service";

@Component({
  selector: 'app-prj-task-list',
  templateUrl: './prj-task-list.component.html',
  styleUrls: ['./prj-task-list.component.scss'],
})
export class PrjTaskListComponent implements OnInit {
  public addButtonTooltips = 'Add';
  task: Task;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selected: any;
  displayedColumns: string[];
  chiltasks: Node<Task>[];
  constructor(
    protected snackbar: MatSnackBar,
    protected dialog: MatDialog,
    protected router: Router,
    private storage: StorageService,
    private treeService: TreeService) {
    this.treeValueSet();
  }
  public treeValueSet() {
    let taskList = <Task[]>this.storage.read(PROJECT.PROJECT_OF_TASKS);
    this.tree = this.treeService.taskTree(taskList);
    console.log(this.tree)
  }
  tree: Node<Task>[];
  signleTree: Node<Task>;
  @Input() newNode: any;
  singleTree: Node<Task>;

  openDialog(task?) {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '60%',
      height: '70%',
      data: task ? task : new Task(),
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.treeValueSet()
    });
  }

  ngOnInit() {
    this.selected = 'table';
    this.displayedColumns = ['title', 'assignee', 'category', 'status', 'action'];
    this.treeValueSet();
  }
  openModal(task?) {
    // console.log('task data 1234');
    // console.log(task.value);
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: '60%',
      height: '71%',
      data: task.value,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.treeValueSet()
    });
  }
  public onValChange(val: string) {
    this.selected = val;
    console.log(this.selected);
  }
}
