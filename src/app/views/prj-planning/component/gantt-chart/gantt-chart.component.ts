import { AfterViewInit, Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-gantt';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { ContextMenuItemModel } from '@syncfusion/ej2-grids';
import { StorageService } from '../../../../common/service/storage/storage.service';
import { PROJECT } from '../../../../common/constant/global-variables.constant';

setCulture('de-DE');

L10n.load({
  'de-DE': {
      'gantt': {
           "id": "ক্রমিক নং",
            "name": "কার্যাবলি",
            "startDate": "প্রারম্ভিক সময়",
            "endDate": "শেষের সময়",
            "duration": "সময়কাল",
            "progress": "অগ্রগতি",
        }
    }
});
@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GanttChartComponent implements OnInit, OnChanges,AfterViewInit {


  public data: object[];
  public taskSettings: object;
  public dayWorkingTime: object;
  public editSettings: EditSettingsModel;
  public timelineSettings: object;
  // public labelSettings: object;
  public eventMarkers: object[];
  public contextMenuItems: (string | ContextMenuItemModel)[];

  constructor(private storage: StorageService) {

  }

  ngAfterViewInit(): void {

    this.data = this.storage.read(PROJECT.PROJECT_OF_TASKS);

  }
  public columns: object[];
  ngOnInit() {
    this.columns =  [
      { field: 'title', clipMode: 'EllipsisWithTooltip', hideAtMedia: '(min-width: 700px)' },
       { field: 'id', width: '0', headerText: 'Task ID', headerTextAlign: 'Left' },
      { field: 'duration', edittype: 'stringedit', allowReordering: true, maxWidth: '400' },
      { field: 'progress',  allowResizing: false , visible: true },
      { field: 'startDate', width: '250', clipMode: 'EllipsisWithTooltip', allowSorting: true,allowReordering: true, minWidth: '200' },
      { field: 'endDate', width: '250', clipMode: 'EllipsisWithTooltip', allowSorting: true,allowReordering: true, minWidth: '200' }
  ];
    this.dayWorkingTime = [{ from: 0, to: 24 }];
    this.contextMenuItems = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel', 'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert',
      { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' } as ContextMenuItemModel,
      { text: 'Expand the Row', target: '.e-content', id: 'expandrow' } as ContextMenuItemModel,
    ];
    this.eventMarkers = [
      {
        day: new Date('04/10/2019'),
        label: 'Project approval and kick-off',
        cssClass: 'e-custom-event-marker',
      }
    ];
    this.taskSettings = {
      id: 'id',
      name: 'title',
      startDate: 'startDate',
      endDate: 'endDate',
      duration: 'duration',
      progress: 'progress',
      child: 'subTasks'
    };


    this.editSettings = {
      allowAdding: false,
      allowEditing: false,
      allowDeleting: false,
      allowTaskbarEditing: true,
      mode: 'Auto',
      newRowPosition: 'Top',
      showDeleteConfirmDialog: false
    };
    this.timelineSettings = {
      showTooltip: true,
      timelineUnitSize: 80,
      timelineViewMode: 'Week',
      updateTimescaleView: true,
      weekStartDay: 0,
      weekendBackground: 'red',
      topTier: {
        format: 'MMM dd, yyyy',
        unit: 'Week',
      },
      bottomTier: {
        unit: 'Day',
        format: 'dd',
        count: 7,
      }
    };
    // this.labelSettings = {
    //   leftLabel: 'Task ID: ${StartDate}',
    //   rightLabel:'Progress Value: ${taskData.EndDate}',
    //   taskLabel: '${Progress}%'
    // }
  
    
     }

  public queryTaskbarInfo($event) {
    //       console.log($event);

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }
}
