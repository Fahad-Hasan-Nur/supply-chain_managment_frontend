import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
     @Inject(MAT_DIALOG_DATA) public data: {value: string, message: string}) { }

  ngOnInit() {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
