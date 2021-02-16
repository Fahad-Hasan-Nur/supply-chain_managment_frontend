import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { DemoMaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ProjectOverviewComponent } from './component/project-overview/project-overview.component';
import { ManPowerComponent } from './component/man-power/man-power.component';
import { ViewMemberDialogComponent } from './component/man-power/dialog/view-member-dialog/view-member-dialog.component';
import { AddMemberDialogComponent } from './component/man-power/dialog/add-member-dialog/add-member-dialog.component';
import { CostOverviewComponent } from './component/cost-overview/cost-overview.component';
import { ProjectAreaComponent } from './component/project-area/project-area.component';
import { AddFileComponent } from './component/add-file/add-file.component';
import { FinanceComponent } from './component/finance/finance.component';
import { Project } from '../prj-planning/model/project';
import { Finance } from './model/finance';
import { Member } from './model/member';
import { LoaderComponent } from './component/loader/loader.component';
import { CostTableComponent } from './component/finance/component/cost-table/cost-table.component';
import { CostComponent } from './component/finance/component/cost/cost.component';
import { ExpenseComponent } from './component/cost-overview/components/expense/expense.component';
import { GoalComponent } from './component/goal/goal.component';
import {SelectModule} from "ng-select";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {StringFilterByPipe} from "../../common/pipe/StringFilterByPipe";
import {OrderByPipe} from "../../common/pipe/OrderByPipe";
import {ViewOrEditDirective} from "../../common/directive/view-or-edit.directive";
import {ViewOrEditOtherDirective} from "../../common/directive/view-or-edit-other.directive";
import {ConfirmationComponent} from "../../common/component/confirmation/confirmation.component";
import {DoubleClickDirective} from "../../common/directive/double-click.directive";



@NgModule({
  declarations: [
    OverviewComponent,
    ProjectOverviewComponent,
    ManPowerComponent,
    ViewMemberDialogComponent,
    AddMemberDialogComponent,
    CostOverviewComponent,
    ExpenseComponent,
    ProjectAreaComponent,
    AddFileComponent,
    FinanceComponent,
    LoaderComponent,
    CostTableComponent,
    CostComponent,
    GoalComponent,
    StringFilterByPipe,
    OrderByPipe,
    ViewOrEditDirective,
    ViewOrEditOtherDirective,
    ConfirmationComponent,
    DoubleClickDirective
  ],
  entryComponents: [ViewMemberDialogComponent, AddMemberDialogComponent,ConfirmationComponent],

  imports: [
    CommonModule,
    OverviewRoutingModule,
    FormsModule,
    NgSelectModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    SelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [DatePipe, Project, Finance, Member]
})
export class OverviewModule {
  constructor() {}
}
