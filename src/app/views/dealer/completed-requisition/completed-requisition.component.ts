import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Requisition } from '../../../common/model/requisition';
import { RequisitionProduct } from '../../../common/model/requisition-product';
import { AdminService } from '../../../service/admin/admin.service';
import { DealerService } from '../../../service/dealer/dealer.service';

@Component({
  selector: 'app-completed-requisition',
  templateUrl: './completed-requisition.component.html',
  styleUrls: ['./completed-requisition.component.scss']
})
export class CompletedRequisitionComponent implements OnInit {

  constructor(
    private service: DealerService,
    private storage: AdminService,

  ) { }
  public view: boolean = true;
  public req: Requisition[] = [];
  public displayedColumns: string[] = ['Creation Time', 'Total Cost', 'Action'];
  public dataSource = new MatTableDataSource;
  public displayedColumns1: string[] = ['Product Name', 'Size', 'Cartoon Size', 'Cartoon Per Lot', 'Cost'];
  public dataSource1 = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getCompleteRequisition(this.storage.usersStorage().id).subscribe
      (
        (response) => {
          this.req = response;
          this.dataSource.data = response as Requisition[];
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }

  viewData(data: Requisition) {
    this.view = false;
    this.service.getRequisitionProduct(data.id).subscribe(
      (res) => {
        this.dataSource1.data = res as RequisitionProduct[];
      }
    )
  }

}
