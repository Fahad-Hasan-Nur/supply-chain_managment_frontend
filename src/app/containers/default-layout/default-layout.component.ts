import { DOCUMENT } from '@angular/common';
import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { getNavItems, NavData } from '../../_nav';
import {MENU_NAME} from '../../common/constant/nav.constant'
import { StorageService } from '../../common/service/storage/storage.service';
import {AUTH, PROJECT} from '../../common/constant/global-variables.constant'
import { Router } from '@angular/router';
import { User } from '../../common/model/user';
import { TranslateService } from '@ngx-translate/core';
import { ProjectService } from '../../service/project/project.service';
import { TaskService } from '../../service/task/task.service';
import { userInfo } from 'os';
import { UsersService } from '../../service/users/users.service';
import {AuthService} from "../../common/service/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
// public navItems = navItems;
// @Output() languageChangeEventEmitter = new EventEmitter<{}>();
public navItems: NavData[];
public menuJson: string;
public roleOid: string;
// employeeInfo: IEmployee;
locale: string;
public sidebarMinimized = false;
private changes: MutationObserver;
public element: HTMLElement;
public showLanguage: string;
public LANGUAGE_BANGLA = 'বাংলা';
public LANGUAGE_ENGLISH = 'English';
public showLoader: boolean;
currentRole: string;
public roleList: Array<any>;
userName: string;
//public currentEmployee: Observable<IEmployee>;
// private currentEmployeeSubject: BehaviorSubject<IEmployee>;

constructor( private storage:StorageService,
             private taskService: TaskService,
             private cdr: ChangeDetectorRef,
             private router: Router,
             private userService: UsersService,
             private translate: TranslateService,
             private authService: AuthService,
             @Inject(DOCUMENT) _document?: any) {

  this.changes = new MutationObserver((mutations) => {
    this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
  });
  this.element = _document.body;
  this.changes.observe(<Element>this.element, {
    attributes: true,
    attributeFilter: ['class']
  });
  this.translate.addLangs(['bn', 'en']);
  this.translate.setDefaultLang('bn');
  this.showLanguage = this.LANGUAGE_ENGLISH;
  // const browserLang = this.translate.getBrowserLang();
  this.translate.use('bn');

}
toggleMinimize(e) {
  this.sidebarMinimized = e;
}
ngOnInit(): void {
  this.userName = this.userService.usersStorage().username;
// let roles = this.storage.read(AUTH.ROLES);
// console.log(roles);
let privilege = new Set<string>();

    //Add Values
  privilege.add(MENU_NAME.PRJ_DASHBOARD);
  privilege.add(MENU_NAME.PRJ_OVERVIEW);
  privilege.add(MENU_NAME.PRJ_ADD);
  privilege.add(MENU_NAME.PRJ_LIST);
  privilege.add(MENU_NAME.PRJ_TASK_LIST);
  privilege.add(MENU_NAME.PRJ_TASK_ADD);
  privilege.add(MENU_NAME.PRJ_ARTICLE_ADD);
  privilege.add(MENU_NAME.PRJ_ARTICLE_LIST);
  // privilege.add(MENU_NAME.USER_ROLES);
  // privilege.add(MENU_NAME.USER_PERMISSION);

 this.navItems = this.filterNavItems(getNavItems(),privilege);
 console.log(this.navItems);

 this.projectOfTasks();

}

private userInfoGet(){

}

private projectOfTasks(){
  let userInfo = this.userService.usersStorage();
  this.taskService.getTasksByPrjId(userInfo.projectId).subscribe(
    res => {
      this.storage.remove(PROJECT.PROJECT_OF_TASKS);
      this.storage.save(PROJECT.PROJECT_OF_TASKS,res);
      console.log(this.storage.read(PROJECT.PROJECT_OF_TASKS));

    },
    err => {
      console.log(err);

    }
  )

}

filterNavItems(items: NavData[], authorities: Set<string>): NavData[] {
  items.forEach(item => {
    if (item.authorities) {
      item.children = null;
    }
    if (item.children) {
      item.children = this.filterNavItems(item.children, authorities);
    }
  });
  return items.filter(item => {
    if (!(item.isMenuLink === undefined || item.isMenuLink === null)) {
      return item.isMenuLink;
    }
    if (item.children) {
      return item.children.length;
    } else {
      return !item.authorities ||
        item.authorities.every(auth => authorities.has(auth));
    }
  });
}

ngOnDestroy(): void {
  this.changes.disconnect();
}

public ngDoCheck(): void {
  this.cdr.detectChanges();
}

public logout() : void {
  this.authService.logout();
}

goToProfile() {

}
goToUrl() {
}

}
