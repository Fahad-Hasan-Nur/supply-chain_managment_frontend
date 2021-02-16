import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestLoginService } from '../../../service/test-login.service';
import { URL } from '../../constant/nav.constant';

@Component({
  templateUrl: '500.component.html'
})
export class P500Component {

  constructor(private testLoginService: TestLoginService) { }


   testLogin(){
    this.testLoginService.getTestLogin().subscribe(
      res => {
        console.log(res.data[0].access_token);
        window.location.replace(window.location.href.replace('/page-not-found',URL.PRJ_OVERVIEW) + '?token='+res.data[0].access_token);
      },
      err => {
        console.log(err);

      })
  }

}
