import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrjTaskListComponent } from './component/prj-task-list/prj-task-list.component';
import { ProjectTaskComponent } from './component/project-task/project-task.component';
import { PrjPlanningComponent } from './prj-planning.component';
import { MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { PrjListComponent } from './component/prj-list/prj-list.component';
import { GanttChartComponent } from './component/gantt-chart/gantt-chart.component';

const routes: Routes = [
  {
    path: URL_NAME.PRJ_ADD,
    component: PrjPlanningComponent,
    data: {
      title: MENU_NAME.PRJ_ADD
    }
  },
  {
    path: URL_NAME.PRJ_LIST,
    component: PrjListComponent,
    data: {
      title: MENU_NAME.PRJ_LIST
    }
  },
  {
    path: URL_NAME.PRJ_TASK_ADD, component: ProjectTaskComponent,
    data: {
      title: MENU_NAME.PRJ_TASK_ADD
    },
  },
  {
    path: URL_NAME.PRJ_TASK_LIST,
    component: PrjTaskListComponent,
    data: {
      title: MENU_NAME.PRJ_TASK_LIST
    },
  },
  {
    path: URL_NAME.PRJ_GRANTT_CHART, component: GanttChartComponent,
    data: {
      title: MENU_NAME.PRJ_GRANTT_CHART
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrjPlanningRoutingModule { }
