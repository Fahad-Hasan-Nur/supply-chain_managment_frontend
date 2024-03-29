import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { VerifiedTransactionComponent } from './verified-transaction/verified-transaction.component';
import { UnverifiedTransactionComponent } from './unverified-transaction/unverified-transaction.component';
import { TransactionViewComponent } from './component/transaction-view/transaction-view.component';
import { Transaction } from '../../common/model/transaction';
import { DealerViewComponent } from './component/dealer-view/dealer-view.component';
import { Admin } from '../../common/model/admin';


@NgModule({
  declarations: [AccountsComponent, VerifiedTransactionComponent, UnverifiedTransactionComponent, TransactionViewComponent, DealerViewComponent],
  entryComponents: [ TransactionViewComponent,DealerViewComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers:[Transaction,Admin]
})
export class AccountsModule { }
