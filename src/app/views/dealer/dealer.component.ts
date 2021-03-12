import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class DealerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
