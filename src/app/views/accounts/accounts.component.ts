import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class AccountsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
