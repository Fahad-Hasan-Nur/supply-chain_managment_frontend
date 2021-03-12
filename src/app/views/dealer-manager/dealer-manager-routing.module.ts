import { UnverifiedDealerComponent } from './unverified-dealer/unverified-dealer.component';
import { DealerManagerComponent } from './dealer-manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { VerifiedDealerComponent } from './verified-dealer/verified-dealer.component';

const routes: Routes = [
  {
    path: '',
    component: DealerManagerComponent,

    children: [
      {
      path:  URL_NAME.VERIFIED_DEALER,
      component:  VerifiedDealerComponent,
      data: {
        title: MENU_NAME.VERIFIED_DEALER
      },
      },
      {
      path:  URL_NAME.UNVERIFIED_DEALER,
      component:  UnverifiedDealerComponent,
      data: {
        title: MENU_NAME.UNVERIFIED_DEALER
      },
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerManagerRoutingModule { }
