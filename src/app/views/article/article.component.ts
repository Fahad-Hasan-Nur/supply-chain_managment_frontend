import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class ArticleComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }

}
