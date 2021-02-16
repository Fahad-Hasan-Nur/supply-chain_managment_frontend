import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrjPlanningRoutingModule } from './prj-planning-routing.module';
import { PrjPlanningComponent } from './prj-planning.component';
import { PrjAddComponent } from './component/prj-add/prj-add.component';
import { DemoMaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectTaskComponent } from './component/project-task/project-task.component';
import { PrjTaskListComponent } from './component/prj-task-list/prj-task-list.component';

import { CreateTaskComponent } from '../../common/component/create-task/create-task.component';
import { PrjTaskTreeListComponent } from './component/prj-task-tree-list/prj-task-tree-list.component';
import { AddTaskModalComponent } from './component/prj-task-list/modal/add/add-task.modal';
import { TaskDetailsComponent } from './component/prj-task-list/modal/task-details/task-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrjListComponent } from './component/prj-list/prj-list.component';
import { DayMarkersService, EditService, FilterService, GanttModule, ReorderService, ResizeService, SelectionService, SortService, ToolbarService} from '@syncfusion/ej2-angular-gantt';
import { GanttChartComponent } from './component/gantt-chart/gantt-chart.component';
import { Project } from './model/project';
import { LoaderComponent } from './loader.component';
import { AttachmentsComponent, FileUploadDialogComponent } from './component/prj-task-list/modal/attachments/attachments.component';
import { ConfirmationComponent } from '../../common/component/confirmation/confirmation.component';
import { PrjViewComponent } from './component/prj-view/prj-view.component';
@NgModule({
  declarations: [
    PrjPlanningComponent,
    PrjAddComponent,
    AddTaskModalComponent,
    ProjectTaskComponent,
    PrjTaskListComponent,
    CreateTaskComponent,
    PrjTaskTreeListComponent,
    FileUploadDialogComponent,
    TaskDetailsComponent,
    PrjListComponent,
    GanttChartComponent,
    AttachmentsComponent,
    LoaderComponent,
    ConfirmationComponent,
    PrjViewComponent,
  ],
  entryComponents: [
    AddTaskModalComponent,
    TaskDetailsComponent,
    FileUploadDialogComponent,
    ConfirmationComponent,
    PrjViewComponent,
  ],
  imports: [
    CommonModule,
    PrjPlanningRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GanttModule,
    TranslateModule
  ],

  providers:[
    ResizeService, SortService, FilterService, SelectionService, ReorderService,
    EditService, DayMarkersService, ToolbarService,Project
  ]
})
export class PrjPlanningModule {
  constructor(){
    console.log('prj-planning-module loaded');
  }
 }
