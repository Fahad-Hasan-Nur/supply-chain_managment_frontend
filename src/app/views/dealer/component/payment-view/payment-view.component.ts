import { Transaction } from './../../../../common/model/transaction';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {

  public toolbarOptions;
  constructor(
    public transaction: Transaction,
    private dialogRef: MatDialogRef<PaymentViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
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
