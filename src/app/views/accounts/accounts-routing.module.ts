import { UnverifiedTransactionComponent } from './unverified-transaction/unverified-transaction.component';
import { VerifiedTransactionComponent } from './verified-transaction/verified-transaction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,

    children: [
      {
      path:  URL_NAME.ACCOUNTS_VERIFIED_TRANSACTION,
      component:  VerifiedTransactionComponent,
      data: {
        title: MENU_NAME.ACCOUNTS_VERIFIED_TRANSACTION
      },
      },
      {
      path:  URL_NAME.ACCOUNTS_UNVERIFIED_TRANSACTION,
      component:  UnverifiedTransactionComponent,
      data: {
        title: MENU_NAME.ACCOUNTS_UNVERIFIED_TRANSACTION
      },
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
