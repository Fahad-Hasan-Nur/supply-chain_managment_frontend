import { ConfirmationComponent } from './../../../common/component/confirmation/confirmation.component';
import { AdminService } from './../../../service/admin/admin.service';
import { Requisition } from './../../../common/model/requisition';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DealerService } from '../../../service/dealer/dealer.service';
import { PaymentComponent } from '../component/payment/payment.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
                private service: DealerService, 
                public route: Router, 
                protected dialog: MatDialog,
                private storage : AdminService,
                ) { }
  public router: Router;
  public req: Requisition[] = [];
  public displayedColumns: string[] = ['Product Name', 'Cartoon Size', 'Cartoon Per Lot', 'Total Cost', 'Action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getOnCartRequisition(this.storage.usersStorage().id).subscribe
      (
        (response) => {
          this.req = response;
          this.dataSource.data = response as Requisition[];
          console.log(this.req);
        },
        (error) => console.log(error),
      );
  }

  public applyFilter(filterValue: any) {
      this.dataSource.filter = filterValue.value.trim().toLowerCase();
  }
  public search(data) {

  }
  
  openDialogPay(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        requisition: data
    };
    this.dialog.open(PaymentComponent, dialogConfig);
  }

  openDialogdelete(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        requisition: data
    };
    this.dialog.open(ConfirmationComponent, dialogConfig);
   }

}
