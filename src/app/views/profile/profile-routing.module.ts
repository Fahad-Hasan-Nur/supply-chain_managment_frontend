import { SUB_CATEGORY_API } from '../../common/constant/api.constants';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MENU_NAME,URL_NAME} from '../../common/constant/nav.constant'
import { ProfileComponent } from './profile.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
      data: {
        title: MENU_NAME.PROFILE
      },
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
