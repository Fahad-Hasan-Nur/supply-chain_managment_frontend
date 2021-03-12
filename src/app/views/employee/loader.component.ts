import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
  <div class="overlay"
    [hidden]="!loading">
    <img src="assets/img/brand/loader_colored.gif" class="spinner" style="height: 200px; width: 200px">
  </div>
  `,
  styles: []
})
export class LoaderComponent implements OnInit {

  public loading:boolean;

  constructor() { }

  ngOnInit() {
  }

}
