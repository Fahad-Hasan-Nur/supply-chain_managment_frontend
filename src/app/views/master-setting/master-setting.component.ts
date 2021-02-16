import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-setting',
  template: `
                 <div class="animated fadeIn">
                   <router-outlet></router-outlet>
                 </div>
                `,
  styles: []
})
export class MasterSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
