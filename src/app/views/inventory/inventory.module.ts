import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { VerifiedRequisitionComponent } from './verified-requisition/verified-requisition.component';
import { UnverifiedRequisitionComponent } from './unverified-requisition/unverified-requisition.component';
import { RequisitionViewComponent } from './component/requisition-view/requisition-view.component';
import { Product } from '../../common/model/product';
import { Requisition } from '../../common/model/requisition';
import { UnderProcessingRequisitionComponent } from './under-processing-requisition/under-processing-requisition.component';
import { CompleteRequisitionComponent } from './complete-requisition/complete-requisition.component';



@NgModule({
  declarations: [InventoryComponent, VerifiedRequisitionComponent, UnverifiedRequisitionComponent, RequisitionViewComponent, UnderProcessingRequisitionComponent, CompleteRequisitionComponent],
  entryComponents: [
    RequisitionViewComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers:[Product,Requisition]
})
export class InventoryModule { }
