import { Transaction } from './../../../../common/model/transaction';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {

  public toolbarOptions;
  constructor(
    public transaction: Transaction,
    private dialogRef: MatDialogRef<TransactionViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.transaction = data.transaction;
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
  }
  close() {
    this.dialogRef.close();
}

}
