import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class SubCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
