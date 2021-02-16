import { Component, OnInit } from '@angular/core';
import {TestLoginService} from "../../../service/test-login.service";

@Component({
  selector: 'app-user-test',
  template: `
    <p>
        {{this.greetings}}
    </p>
  `,
  styles: []
})
export class UserTestComponent implements OnInit {

  public greetings:any;

  constructor(private testService: TestLoginService) {

  }

  ngOnInit() {
    this.testLogin();
  }

  public testLogin(){
    this.testService.testGreetingService().subscribe(ob => {
      console.log(ob)
      this.greetings = JSON.stringify(ob);
    },error => {
      this.greetings = error;
      console.log(error)
    });
  }

}
