import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-manager',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class DealerManagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
