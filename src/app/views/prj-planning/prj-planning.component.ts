import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prj-planning',
  template: `
    <div class="overlay" [hidden]="!isLoadingResults">
      <img
        src="assets/img/brand/loader_colored.gif"
        class="spinner"
        style="height: 200px; width: 200px"
      />
    </div>
    <div class="animated fadeIn">
      <app-prj-add></app-prj-add>
    </div>
  `,
  styles: [],
})
export class PrjPlanningComponent implements OnInit {
  isLoadingResults = false;
  constructor() {}

  ngOnInit() {}
}
