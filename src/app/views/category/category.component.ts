import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
