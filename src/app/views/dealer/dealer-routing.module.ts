import { ShopComponent } from './shop/shop.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant'
import { DealerComponent } from './dealer.component';

const routes: Routes = [
  {
    path: '',
    component: DealerComponent,
    children: [
      {
        path: URL_NAME.DEALER_SHOP,
        component: ShopComponent,
        data: {
          title: MENU_NAME.DEALER_SHOP,
        },
      },
      {
        path: URL_NAME.DEALER_CART,
        component: CartComponent,
        data: {
          title: MENU_NAME.DEALER_CART,
        },
      },
      {
        path: URL_NAME.DEALER_PURCHASE_HISTORY,
        component: PurchaseHistoryComponent,
        data: {
          title: MENU_NAME.DEALER_PURCHASE_HISTORY,
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerRoutingModule { }
