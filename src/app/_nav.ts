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
  }  
];
