import { ImageService } from './../../service/image/image.service';
import { ROLES } from './../../common/constant/nav.constant';
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
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;

  constructor(private storage: StorageService,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService,
    private translate: TranslateService,
    private imageService: ImageService,
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
    this.translate.use('bn');

  }
  public toggleMinimize(e) {
    this.sidebarMinimized = e;
    
  }
  getImage(id) {
    this.imageService.getImageById(id).subscribe
      (
        (response) => {
          this.retrieveResonse = response;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        (error) => console.log(error),
      );
  }
  public ngOnInit(): void {
    this.getImage(this.adminService.usersStorage().imageId);
    this.userName = this.adminService.usersStorage().email;
    let roles = this.storage.read(AUTH.ROLES);
    console.log(roles);
    const privilege = new Set<string>();

    // privilege.add(MENU_NAME.CATEGORY);
    if(roles==ROLES.ADMIN || roles==ROLES.SUPER_ADMIN){
    privilege.add(MENU_NAME.BRAND);
    privilege.add(MENU_NAME.PRODUCT_ADD);
    privilege.add(MENU_NAME.PRODUCT_LIST);
    privilege.add(MENU_NAME.BRAND_ADD);
    privilege.add(MENU_NAME.BRAND_LIST);
    privilege.add(MENU_NAME.CATEGORY_ADD);
    privilege.add(MENU_NAME.CATEGORY_LIST);
    privilege.add(MENU_NAME.SUB_CATEGORY_ADD);
    privilege.add(MENU_NAME.SUB_CATEGORY_LIST);
    }
    if(roles==ROLES.SUPER_ADMIN){
      privilege.add(MENU_NAME.EMPLOYYE_ADD);
      privilege.add(MENU_NAME.EMPLOYYE_LIST);
    }
    if(roles==ROLES.DEALER ){
      privilege.add(MENU_NAME.DEALER_SHOP);
      privilege.add(MENU_NAME.DEALER_CART);
      privilege.add(MENU_NAME.DEALER_PURCHASE_HISTORY)
    }
    if(roles==ROLES.DEALER_MANAGER||roles==ROLES.SUPER_ADMIN ){
      privilege.add(MENU_NAME.DEALER_MANAGER);
      privilege.add(MENU_NAME.VERIFIED_DEALER);
      privilege.add(MENU_NAME.UNVERIFIED_DEALER)
    }
    if(roles==ROLES.INVENTORY_MANAGER||roles==ROLES.SUPER_ADMIN ){
      privilege.add(MENU_NAME.INVENTORY);
      privilege.add(MENU_NAME.INVENTORY_VERIFIED_REQUISITION);
      privilege.add(MENU_NAME.INVENTORY_UNVERIFIED_REQUISITION);
    }
    if(roles==ROLES.ACCOUNT_MANAGER||roles==ROLES.SUPER_ADMIN ){
      privilege.add(MENU_NAME.ACCOUNTS);
      privilege.add(MENU_NAME.ACCOUNTS_VERIFIED_TRANSACTION);
      privilege.add(MENU_NAME.ACCOUNTS_UNVERIFIED_TRANSACTION);
    }
    this.navItems = this.filterNavItems(getNavItems(), privilege);
    console.log(this.navItems);
  }

  private userInfoGet() {

  }

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

  public goToProfile() {

  }
  public goToUrl() {
  }
  public logOut(){
    this.authService.logout();
  }

}
