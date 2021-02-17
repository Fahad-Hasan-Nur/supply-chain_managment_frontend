
import { Component, OnInit, ViewChild } from '@angular/core';
import { TestLoginService } from '../../../service/test-login.service';
import { LoaderComponent } from '../../../views/product/loader.component';
import { success_message } from '../../constant/messages';
import { URL } from '../../constant/nav.constant';
import { Auth } from '../../model/auth';
import { StateService } from '../../service/state.service';
import { ToastService } from '../../service/toast.service';
import { StorageService } from './../../service/storage/storage.service';

@Component({
  templateUrl: '500.component.html',
  styleUrls: ['500.component.scss'],
})
export class P500Component implements OnInit  {

  @ViewChild(LoaderComponent, { static: false })
  public loader: LoaderComponent;
  constructor(private testLoginService: TestLoginService,
              private storage: StorageService,
              private stateService: StateService,
              public data: Auth,
              private toastService: ToastService) { }

    public ngOnInit() {
      this.setStateProject(this.data);
    }

    public setStateProject(auth: Auth): void {
      this.stateService.setAuth(auth);
    }

   public testLogin() {
    this.testLoginService.getTestLogin(this.stateService.getAuth()).subscribe(
      (res) => {
        window.location.replace(window.location.href.replace('/page-not-found', URL.PRODUCT_LIST) + '?token=' + res.jwt);
      },
      (err) => {
        console.log(err);
      });
  }

}
