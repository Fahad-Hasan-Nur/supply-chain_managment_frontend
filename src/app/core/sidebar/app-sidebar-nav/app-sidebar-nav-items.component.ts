import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {SidebarNavHelper} from '../app-sidebar-nav.service';

@Component({
  selector: 'ast-sidebar-nav-items',
  template: `
    <ng-container *ngFor="let item of items">
      <ng-container [ngSwitch]="helper.itemType(item)">
        <ast-sidebar-nav-dropdown
          *ngSwitchCase="'dropdown'"
          [item]="item"
          [class.open]="helper.isActive(router, item)"
          [ngClass]="helper.getClass(item)"
          appNavDropdown
          routerLinkActive="open">
        </ast-sidebar-nav-dropdown>
        <ast-sidebar-nav-divider
          *ngSwitchCase="'divider'"
          [item]="item"
          [ngClass]="helper.getClass(item)"
          [appHtmlAttr]="item.attributes">
        </ast-sidebar-nav-divider>
        <ast-sidebar-nav-title
          *ngSwitchCase="'title'"
          [item]="item"
          [ngClass]="helper.getClass(item)"
          [appHtmlAttr]="item.attributes">
        </ast-sidebar-nav-title>
        <ast-sidebar-nav-label
          *ngSwitchCase="'label'"
          [item]="item"
          class="nav-item"
          [ngClass]="helper.getClass(item)">
        </ast-sidebar-nav-label>
        <ng-container
          *ngSwitchCase="'empty'">
        </ng-container>
        <ast-sidebar-nav-link
          *ngSwitchDefault
          [item]="item"
          class="nav-item"
          [ngClass]="helper.getClass(item)">
        </ast-sidebar-nav-link>
      </ng-container>
    </ng-container>
  `
})
export class AppSidebarNavItemsComponent {
  @Input() items: Array<any>;
  constructor(
    public router: Router,
    public helper: SidebarNavHelper
  ) {}
}
