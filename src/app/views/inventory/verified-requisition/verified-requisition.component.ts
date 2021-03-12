import { ToastService } from './../../../common/service/toast.service';
import { RequisitionViewComponent } from './../component/requisition-view/requisition-view.component';
import { Requisition } from './../../../common/model/requisition';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DealerService } from '../../../service/dealer/dealer.service';
import { success_message } from '../../../common/constant/messages';

@Component({
  selector: 'app-verified-requisition',
  templateUrl: './verified-requisition.component.html',
  styleUrls: ['./verified-requisition.component.scss']
})
export class VerifiedRequisitionComponent implements OnInit {

  constructor(private service: DealerService, protected dialog: MatDialog,private toastService:ToastService) { }
  public requisition: Requisition[] = [];
  public loading:boolean=false;
  public displayedColumns: string[] = ['Product Name', 'Status','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getRequisitionByStatus("Verified").subscribe
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

  public complete(data?) {
    this.service.completeRequisition(data.id).subscribe
    (
      (response) => {
        this.toastService.openSnackBar(success_message.UPDATED_SUCCESSFULLY, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
        this.loading=false;
      },
      (error) => {
        this.loading=false;
        console.log(error);
        this.toastService.openSnackBar(success_message.FAILD, this.toastService.ACTION_WRONG, this.toastService.CLASS_NAME_WRONG);
      }
    )
  }
}

