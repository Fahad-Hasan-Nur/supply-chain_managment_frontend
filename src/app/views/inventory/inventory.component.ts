import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
