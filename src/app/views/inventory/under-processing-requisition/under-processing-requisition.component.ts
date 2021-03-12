import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Requisition } from '../../../common/model/requisition';
import { DealerService } from '../../../service/dealer/dealer.service';
import { RequisitionViewComponent } from '../component/requisition-view/requisition-view.component';

@Component({
  selector: 'app-under-processing-requisition',
  templateUrl: './under-processing-requisition.component.html',
  styleUrls: ['./under-processing-requisition.component.scss']
})
export class UnderProcessingRequisitionComponent implements OnInit {

  constructor(private service: DealerService, protected dialog: MatDialog) { }
  public requisition: Requisition[] = [];
  public displayedColumns: string[] = ['Product Name', 'Status','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getRequisitionByStatus("Processing").subscribe
      (
        (response) => {
          this.requisition = response;
          this.dataSource.data = response as Requisition[];
          console.log(this.requisition);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {  }

  openDialogView(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        requisition: data
    };
    this.dialog.open(RequisitionViewComponent, dialogConfig);
  }

}

