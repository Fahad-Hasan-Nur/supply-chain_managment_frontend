import { TransactionViewComponent } from './../component/transaction-view/transaction-view.component';
import { Transaction } from './../../../common/model/transaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DealerService } from '../../../service/dealer/dealer.service';

@Component({
  selector: 'app-verified-transaction',
  templateUrl: './verified-transaction.component.html',
  styleUrls: ['./verified-transaction.component.scss']
})
export class VerifiedTransactionComponent implements OnInit {

  constructor(private service: DealerService, protected dialog: MatDialog) { }
  public transaction: Transaction[] = [];
  public displayedColumns: string[] = ['Transaction Id', 'Status','action'];
  public dataSource = new MatTableDataSource;
  public showFilters: boolean;
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getTransactionByStatus("Complete").subscribe
      (
        (response) => {
          this.transaction = response;
          this.dataSource.data = response as Transaction[];
          console.log(this.transaction);
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
        transaction: data
    };
    this.dialog.open(TransactionViewComponent, dialogConfig);
  }

  public complete(data?) {
  
    
  }
}

