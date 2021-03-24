import * as _ from 'lodash';
import { ROLES, MENU_NAME, ICON, URL } from '../app/common/constant/nav.constant'

interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
  requiredRole?: string[];
  authorities?: string[];
  isMenuLink?: boolean;
}
export function getNavItems() {
  return _.cloneDeep(navItems);
}

export const navItems: NavData[] = [
  {
    name: MENU_NAME.DEALER,
    url: URL.DEALER,
    icon: ICON.DEALER,
    children: [
      //Shop
      {
        name: MENU_NAME.DEALER_SHOP,
        url: URL.DEALER_SHOP,
        icon: ICON.DEALER_SHOP,
        authorities: [MENU_NAME.DEALER_SHOP],
        
      },
      //Cart
      {
        name: MENU_NAME.DEALER_CART,
        url: URL.DEALER_CART,
        icon: ICON.DEALER_CART,
        authorities: [MENU_NAME.DEALER_CART],
      },
      //Purchase History
      {
        name: MENU_NAME.DEALER_PURCHASE_HISTORY,
        url: URL.DEALER_PURCHASE_HISTORY,
        icon: ICON.DEALER_PURCHASE_HISTORY,
        authorities: [MENU_NAME.DEALER_PURCHASE_HISTORY],
        
      },
      //Complete Requisition
      {
        name: MENU_NAME.DEALER_COMPLETED_REQUISITION,
        url: URL.DEALER_COMPLETED_REQUISITION,
        icon: ICON.DEALER_COMPLETED_REQUISITION,
        authorities: [MENU_NAME.DEALER_COMPLETED_REQUISITION],
        
      },
    ]
  },

  {
    name: MENU_NAME.PRODUCT,
    url: URL.PRODUCT,
    icon: ICON.PRODUCT,
    children: [
      //PRODUCT LIST VIEW
      {
        name: MENU_NAME.PRODUCT_LIST,
        url: URL.PRODUCT_LIST,
        icon: ICON.PRODUCT_LIST,
        authorities: [MENU_NAME.PRODUCT_LIST],
        requiredRole: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN
        ]
      },
      //PRODUCT ADD
      {
        name: MENU_NAME.PRODUCT_ADD,
        url: URL.PRODUCT_ADD,
        icon: ICON.PRODUCT_ADD,
        authorities: [MENU_NAME.PRODUCT_ADD],
        requiredRole: [
          //ROLES.ADMIN,
          ROLES.SUPER_ADMIN,
        ]
      },
    ]
  },
  //Brand
  {
    name: MENU_NAME.BRAND,
    url: URL.BRAND,
    icon: ICON.BRAND,
    children: [
      //BRAND LIST VIEW
      {
        name: MENU_NAME.BRAND_LIST,
        url: URL.BRAND_LIST,
        icon: ICON.BRAND_LIST,
        authorities: [MENU_NAME.BRAND_LIST],
        requiredRole: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN
        ]
      },
      //PRODUCT ADD
      {
        name: MENU_NAME.BRAND_ADD,
        url: URL.BRAND_ADD,
        icon: ICON.BRAND_ADD,
        authorities: [MENU_NAME.BRAND_ADD],
        requiredRole: [
          ROLES.ADMIN,
          ROLES.SUPER_ADMIN,
        ]
      },
    ]
  },
  //Category
  {
    name: MENU_NAME.CATEGORY,
    url: URL.CATEGORY,
    icon: ICON.CATEGORY,
    children: [
      //BRAND LIST VIEW
      {
        name: MENU_NAME.CATEGORY_LIST,
        url: URL.CATEGORY_LIST,
        icon: ICON.CATEGORY_LIST,
        authorities: [MENU_NAME.CATEGORY_LIST],
        requiredRole: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN
        ]
      },
      //PRODUCT ADD
      {
        name: MENU_NAME.CATEGORY_ADD,
        url: URL.CATEGORY_ADD,
        icon: ICON.CATEGORY_ADD,
        authorities: [MENU_NAME.CATEGORY_ADD],
        requiredRole: [
          ROLES.ADMIN,
          ROLES.SUPER_ADMIN,
        ]
      },
    ]
  },
  //SUb-Category
  {
    name: MENU_NAME.SUB_CATEGORY,
    url: URL.SUB_CATEGORY,
    icon: ICON.SUB_CATEGORY,
    children: [
      //Sub category LIST VIEW
      {
        name: MENU_NAME.SUB_CATEGORY_LIST,
        url: URL.SUB_CATEGORY_LIST,
        icon: ICON.SUB_CATEGORY_LIST,
        authorities: [MENU_NAME.SUB_CATEGORY_LIST],
        requiredRole: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN
        ]
      },
      //SUBCATEGORY ADD
      {
        name: MENU_NAME.SUB_CATEGORY_ADD,
        url: URL.SUB_CATEGORY_ADD,
        icon: ICON.SUB_CATEGORY_ADD,
        authorities: [MENU_NAME.SUB_CATEGORY_ADD],
        requiredRole: [
          ROLES.ADMIN,
          ROLES.SUPER_ADMIN,
        ]
      },
    ]
  },

  //Employee
  {
    name: MENU_NAME.EMPLOYYE,
    url: URL.EMPLOYEE,
    icon: ICON.EMPLOYEE,
    requiredRole: [
      ROLES.SUPER_ADMIN,
    ],
    children: [
      //Sub category LIST VIEW
      {
        name: MENU_NAME.EMPLOYYE_LIST,
        url: URL.EMPLOYEE_LIST,
        icon: ICON.EMPLOYEE_LIST,
        authorities: [MENU_NAME.EMPLOYYE_LIST],
        requiredRole: [
          ROLES.SUPER_ADMIN,
        ]
      },
      //SUBCATEGORY ADD
      {
        name: MENU_NAME.EMPLOYYE_ADD,
        url: URL.EMPLOYEE_ADD,
        icon: ICON.EMPLOYEE_ADD,
        authorities: [MENU_NAME.EMPLOYYE_ADD],
        requiredRole: [
          ROLES.SUPER_ADMIN,
        ]
      },
    ]
  },
  //Dealer Manager
  {
    name: MENU_NAME.DEALER_MANAGER,
    url: URL.DEALER_MANAGER,
    icon: ICON.DEALER_MANAGER,
    children: [
      //Verified
      {
        name: MENU_NAME.VERIFIED_DEALER,
        url: URL.VERIFIED_DEALER,
        icon: ICON.VERIFIED_DEALER,
        authorities: [MENU_NAME.VERIFIED_DEALER],
      },
      //Un verified
      {
        name: MENU_NAME.UNVERIFIED_DEALER,
        url: URL.UNVERIFIED_DEALER,
        icon: ICON.UNVERIFIED_DEALER,
        authorities: [MENU_NAME.UNVERIFIED_DEALER],
      },
    ]
  },

  //Inventory
  {
    name: MENU_NAME.INVENTORY,
    url: URL.INVENTORY,
    icon: ICON.INVENTORY,
    children: [
 //     Verified
      {
        name: MENU_NAME.INVENTORY_VERIFIED_REQUISITION,
        url: URL.INVENTORY_VERIFIED_REQUISITION,
        icon: ICON.INVENTORY_VERIFIED_REQUISITION,
        authorities: [MENU_NAME.INVENTORY_VERIFIED_REQUISITION],
        
      },
      //Un verified
      {
        name: MENU_NAME.INVENTORY_UNVERIFIED_REQUISITION,
        url: URL.INVENTORY_UNVERIFIED_REQUISITION,
        icon: ICON.INVENTORY_UNVERIFIED_REQUISITION,
        authorities: [MENU_NAME.INVENTORY_UNVERIFIED_REQUISITION],
      },
      // Under Processing
      {
        name: MENU_NAME.INVENTORY_UNDER_PROCESSING_REQUISITION,
        url: URL.INVENTORY_UNDER_PROCESSING_REQUISITION,
        icon: ICON.INVENTORY_UNDER_PROCESSING_REQUISITION,
        authorities: [MENU_NAME.INVENTORY_UNDER_PROCESSING_REQUISITION],
        
      },
      // Complete
      {
        name: MENU_NAME.INVENTORY_COMPLETE_REQUISITION,
        url: URL.INVENTORY_COMPLETE_REQUISITION,
        icon: ICON.INVENTORY_COMPLETE_REQUISITION,
        authorities: [MENU_NAME.INVENTORY_COMPLETE_REQUISITION],
      },
    ]
  },
  //Account
  {
    name: MENU_NAME.ACCOUNTS,
    url: URL.ACCOUNTS,
    icon: ICON.ACCOUNTS,
    children: [
      //Verified
      {
        name: MENU_NAME.ACCOUNTS_VERIFIED_TRANSACTION,
        url: URL.ACCOUNTS_VERIFIED_TRANSACTION,
        icon: ICON.ACCOUNTS_VERIFIED_TRANSACTION,
        authorities: [MENU_NAME.ACCOUNTS_VERIFIED_TRANSACTION],
      },
      //Un verified
      {
        name: MENU_NAME.ACCOUNTS_UNVERIFIED_TRANSACTION,
        url: URL.ACCOUNTS_UNVERIFIED_TRANSACTION,
        icon: ICON.ACCOUNTS_UNVERIFIED_TRANSACTION,
        authorities: [MENU_NAME.ACCOUNTS_UNVERIFIED_TRANSACTION],
      },
    ]
  },

];
