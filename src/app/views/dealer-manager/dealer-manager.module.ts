import { VerifiedDealerInfo } from './../../common/model/verified-dealer-info';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DealerManagerComponent } from './dealer-manager.component';
import { UnverifiedDealerComponent } from './unverified-dealer/unverified-dealer.component';
import { VerifiedDealerComponent } from './verified-dealer/verified-dealer.component';
import { DealerManagerRoutingModule } from './dealer-manager-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../material.module';
import { DealerViewComponent } from './component/dealer-view/dealer-view.component';
import { LoaderComponent } from './loader.component';
import { RejectDealerComponent } from './component/reject-dealer/reject-dealer.component';
import { VerifyDealerComponent } from './component/verify-dealer/verify-dealer.component';



@NgModule({
  declarations: [DealerManagerComponent, VerifiedDealerComponent, UnverifiedDealerComponent, DealerViewComponent,LoaderComponent, RejectDealerComponent, VerifyDealerComponent],

  entryComponents: [
  DealerViewComponent,RejectDealerComponent,VerifyDealerComponent
  ],
  imports: [
    CommonModule,
    DealerManagerRoutingModule,
    FormsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,VerifiedDealerInfo],
})
export class DealerManagerModule { }
