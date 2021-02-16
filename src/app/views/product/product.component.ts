import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class ProductComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }

}
