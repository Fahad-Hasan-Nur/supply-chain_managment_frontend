import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { userInfo } from 'os';
// import { TranslateService } from '@ngx-translate/core';
import { getNavItems, NavData } from '../../_nav';
import { AUTH, PROJECT } from '../../common/constant/global-variables.constant';
import { MENU_NAME } from '../../common/constant/nav.constant';
import { StorageService } from '../../common/service/storage/storage.service';
import { ProjectService } from '../../service/project/project.service';
import { TaskService } from '../../service/task/task.service';
import { AdminService } from '../../service/admin/admin.service';
import {AuthService} from "../../common/service/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  // public navItems = navItems;
  // @Output() languageChangeEventEmitter = new EventEmitter<{}>();
  public navItems: NavData[];
  public menuJson: string;
  public roleOid: string;
  // employeeInfo: IEmployee;
  public locale: string;
  public sidebarMinimized = false;
  private changes: MutationObserver;
  public element: HTMLElement;
  public showLanguage: string;
  public LANGUAGE_ENGLISH = 'English';
  public showLoader: boolean;
  public currentRole: string;
  public roleList: Array<any>;
  public userName: string;
  // public currentEmployee: Observable<IEmployee>;
  // private currentEmployeeSubject: BehaviorSubject<IEmployee>;

  constructor(private storage: StorageService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private adminService: AdminService,
    private translate: TranslateService,
    private authService: AuthService,
    @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(this.element as Element, {
      attributes: true,
      attributeFilter: ['class'],
    });
    this.translate.addLangs(['bn', 'en']);
    this.showLanguage = this.LANGUAGE_ENGLISH;
    // const browserLang = this.translate.getBrowserLang();
    this.translate.use('bn');

  }
  public toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  public ngOnInit(): void {
    this.userName = this.adminService.usersStorage().email;
    // let roles = this.storage.read(AUTH.ROLES);
    // console.log(roles);
    const privilege = new Set<string>();

    // privilege.add(MENU_NAME.CATEGORY);
    // privilege.add(MENU_NAME.BRAND);
    // privilege.add(MENU_NAME.PRJ_DASHBOARD);
    // privilege.add(MENU_NAME.PRJ_OVERVIEW);
    // privilege.add(MENU_NAME.PRJ_ADD);
    // privilege.add(MENU_NAME.PRJ_LIST);
    // privilege.add(MENU_NAME.PRJ_TASK_LIST);
    // privilege.add(MENU_NAME.PRJ_TASK_ADD);
    privilege.add(MENU_NAME.PRODUCT_ADD);
    privilege.add(MENU_NAME.PRODUCT_LIST);
    // privilege.add(MENU_NAME.USER_ROLES);
    // privilege.add(MENU_NAME.USER_PERMISSION);

    this.navItems = this.filterNavItems(getNavItems(), privilege);
    console.log(this.navItems);

  //  this.projectOfTasks();

  }

  private userInfoGet() {

  }

  // private projectOfTasks() {
  //   const userInfo = this.adminService.usersStorage();
  //   this.taskService.getTasksByPrjId(userInfo.projectId).subscribe(
  //     (res) => {
  //       this.storage.remove(PROJECT.PROJECT_OF_TASKS);
  //       this.storage.save(PROJECT.PROJECT_OF_TASKS, res);
  //       console.log(this.storage.read(PROJECT.PROJECT_OF_TASKS));
  //     },
  //     (err) => {
  //       console.log(err);

  //     },
  //   );
  // }

  public filterNavItems(items: NavData[], authorities: Set<string>): NavData[] {
    items.forEach((item) => {
      if (item.authorities) {
        item.children = null;
      }
      if (item.children) {
        item.children = this.filterNavItems(item.children, authorities);
      }
    });
    return items.filter((item) => {
      if (!(item.isMenuLink === undefined || item.isMenuLink === null)) {
        return item.isMenuLink;
      }
      if (item.children) {
        return item.children.length;
      } else {
        return !item.authorities ||
          item.authorities.every((auth) => authorities.has(auth));
      }
    });
  }

  public ngOnDestroy(): void {
    this.changes.disconnect();
  }

  public ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  // public logout() : void {
  //   this.authService.logout();
  // }

  public goToProfile() {

  }
  public goToUrl() {
  }
  public logOut(){
    this.authService.logout();
  }

}
