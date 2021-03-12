import { URL } from './../../constant/nav.constant';
import { Router } from '@angular/router';
import { routes } from './../../../app-routing.module';
import { DealerService } from './../../../service/dealer/dealer.service';
import { Requisition } from './../../model/requisition';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    private dealerService: DealerService,
    public requisition: Requisition,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ren: Renderer2,
    ) {
      this.requisition = data.requisition;
  }

  ngOnInit() {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClick() {
    this.dealerService.deleteRequisitionById(this.requisition.id).subscribe
    (
      (response) => {
        console.log(response)
      },
      (error) => console.log(error),
    );  
    this.dialogRef.close();
    this.router.navigateByUrl(URL.DEALER_SHOP);
  }
}
