import { RequisitionProduct } from './../../common/model/requisition-product';
import { ConfirmationComponent } from './../../common/component/confirmation/confirmation.component';
import { Transaction } from './../../common/model/transaction';
import { Product } from './../../common/model/product';
import { Requisition } from './../../common/model/requisition';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DealerComponent } from './dealer.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { DealerRoutingModule } from './dealer-routing.module';
import { LoaderComponent } from './loader.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentViewComponent } from './component/payment-view/payment-view.component';
import { CompletedRequisitionComponent } from './completed-requisition/completed-requisition.component';



@NgModule({
  declarations: [DealerComponent, ShopComponent, CartComponent, PurchaseHistoryComponent,LoaderComponent, PaymentComponent, PaymentViewComponent,PaymentViewComponent,ConfirmationComponent, CompletedRequisitionComponent],
  imports: [
    CommonModule,
    DealerRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,Requisition,Product,Transaction,RequisitionProduct],
  entryComponents:[PaymentComponent,PaymentViewComponent,ConfirmationComponent]
})
export class DealerModule { 
  constructor() {
    console.log('dealer-module loaded');
  }
}

