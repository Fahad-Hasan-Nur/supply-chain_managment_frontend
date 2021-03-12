import { CompleteRequisitionComponent } from './complete-requisition/complete-requisition.component';
import { UnderProcessingRequisitionComponent } from './under-processing-requisition/under-processing-requisition.component';
import { UnverifiedRequisitionComponent } from './unverified-requisition/unverified-requisition.component';
import { InventoryComponent } from './inventory.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MENU_NAME, URL_NAME } from '../../common/constant/nav.constant';
import { VerifiedRequisitionComponent } from './verified-requisition/verified-requisition.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,

    children: [
      {
      path:  URL_NAME.INVENTORY_VERIFIED_REQUISITION,
      component:  VerifiedRequisitionComponent,
      data: {
        title: MENU_NAME.INVENTORY_VERIFIED_REQUISITION
      }
    },
      {
      path:  URL_NAME.INVENTORY_UNVERIFIED_REQUISITION,
      component:  UnverifiedRequisitionComponent,
      data: {
        title: MENU_NAME.INVENTORY_UNVERIFIED_REQUISITION
      },
      
    },
    {
      path:  URL_NAME.INVENTORY_UNDER_PROCESSING_REQUISITION,
      component:  UnderProcessingRequisitionComponent,
      data: {
        title: MENU_NAME.INVENTORY_UNDER_PROCESSING_REQUISITION
      }
    },
    {
      path:  URL_NAME.INVENTORY_COMPLETE_REQUISITION,
      component:  CompleteRequisitionComponent,
      data: {
        title: MENU_NAME.INVENTORY_COMPLETE_REQUISITION
      }
    },
  ]
}

];
      

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
