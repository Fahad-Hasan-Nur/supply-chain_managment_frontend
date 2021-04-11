import { ProductService } from './../../../../service/product/product.service';
import { Requisition } from './../../../../common/model/requisition';
import { Component, Inject, OnInit } from '@angular/core';
import { ImageService } from '../../../../service/image/image.service';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { EDITOR_OPTIONS_MEDIUM } from '../../../../common/constant/editor.constants';
import { Product } from '../../../../common/model/product';
import { DealerService } from '../../../../service/dealer/dealer.service';
import { RequisitionProduct } from '../../../../common/model/requisition-product';

@Component({
  selector: 'app-requisition-view',
  templateUrl: './requisition-view.component.html',
  styleUrls: ['./requisition-view.component.scss']
})
export class RequisitionViewComponent implements OnInit {

  public toolbarOptions;
  public retrievedImage: any;
  public req: Requisition[] = [];

  public base64Data: any;
  public retrieveResonse: any;
  public product: Product;
  public dataSource = new MatTableDataSource;
  public displayedColumns: string[] = ['Product Name', 'Size', 'Cartoon Size', 'Cartoon Per Lot', 'Cost'];
  constructor(
    public requisition: Requisition,
    private service: DealerService,
    private dialogRef: MatDialogRef<RequisitionViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    ) {
      this.requisition = data.requisition;
  }
  ngOnInit() {
    this.toolbarOptions = EDITOR_OPTIONS_MEDIUM;
    this.viewData();
  }
  close() {
    this.dialogRef.close();
}
  viewData() {
    this.service.getRequisitionProduct(this.requisition.id).subscribe(
      (res) => {
        this.dataSource.data = res as RequisitionProduct[];
      }
    )
  }
}
