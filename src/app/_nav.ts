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
  // {
  //   name: MENU_NAME.CATEGORY,
  //   url: URL.CATEGORY,
  //   icon: ICON.CATEGORY,
  //   authorities: [MENU_NAME.CATEGORY],
  //   requiredRole: [
  //     ROLES.PRJ_GED_AUTHOR,
  //     ROLES.PRJ_PD_AND_TEAM_MEMBER,
  //     ROLES.PRJ_SECRETARY,
  //     ROLES.PRJ_SUPPER_ADMIN
  //   ]
  // },
  // {
  //   name: MENU_NAME.BRAND,
  //   url: URL.BRAND,
  //   icon: ICON.BRAND,
  //   authorities: [MENU_NAME.BRAND],
  //   requiredRole: [
  //     ROLES.PRJ_GED_AUTHOR,
  //     ROLES.PRJ_PD_AND_TEAM_MEMBER,
  //     ROLES.PRJ_SECRETARY,
  //     ROLES.PRJ_SUPPER_ADMIN
  //   ]
  // },
//   {
//     name: MENU_NAME.PRJ_OVERVIEW,
//     url: URL.PRJ_OVERVIEW,
//     icon: ICON.PRJ_OVERVIEW,
//     authorities: [MENU_NAME.PRJ_OVERVIEW],
//     requiredRole: [
//       ROLES.PRJ_GED_AUTHOR,
//       ROLES.PRJ_PD_AND_TEAM_MEMBER,
//       ROLES.PRJ_SECRETARY,
//       ROLES.PRJ_SUPPER_ADMIN
//     ]
//   },
//   //TASK LIST VIEW
//   {
//     name: MENU_NAME.PRJ_TASK_LIST,
//     url: URL.PRJ_TASK_LIST,
//     icon: ICON.PRJ_TASK_LIST,
//     authorities: [MENU_NAME.PRJ_TASK_LIST],
//     requiredRole: [
//       ROLES.PRJ_GED_AUTHOR,
//       ROLES.PRJ_PD_AND_TEAM_MEMBER,
//       ROLES.PRJ_SECRETARY,
//       ROLES.PRJ_SUPPER_ADMIN
//     ]
//   },
//   //TASK ADD
//   {
//     name: MENU_NAME.PRJ_TASK_ADD,
//     url: URL.PRJ_TASK_ADD,
//     icon: ICON.PRJ_TASK_ADD,
//     authorities: [MENU_NAME.PRJ_TASK_ADD],
//     requiredRole: [
//       ROLES.PRJ_GED_AUTHOR,
//       ROLES.PRJ_PD_AND_TEAM_MEMBER,
//       ROLES.PRJ_SECRETARY,
//       ROLES.PRJ_SUPPER_ADMIN
//     ]
//   },

//   //PROJECT LIST VIEW
//   {
//     name: MENU_NAME.PRJ_LIST,
//     url: URL.PRJ_LIST,
//     icon: ICON.PRJ_LIST,
//     authorities: [MENU_NAME.PRJ_LIST],
//     requiredRole: [
//       ROLES.PRJ_GED_AUTHOR,
//       ROLES.PRJ_PD_AND_TEAM_MEMBER,
//       ROLES.PRJ_SECRETARY,
//       ROLES.PRJ_SUPPER_ADMIN
//     ]
//   },
//  // PROJECT ADD
//   {
//     name: MENU_NAME.PRJ_ADD,
//     url: URL.PRJ_ADD,
//     icon: ICON.PRJ_ADD,
//     authorities: [MENU_NAME.PRJ_ADD],
//     requiredRole: [
//       ROLES.PRJ_GED_AUTHOR,
//       ROLES.PRJ_PD_AND_TEAM_MEMBER,
//       ROLES.PRJ_SECRETARY,
//       ROLES.PRJ_SUPPER_ADMIN
//     ]
//   },
 // ARTICLE
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
  //REPORT
  // {
  //   name: MENU_NAME.REPORT,
  //   url: URL.REPORT,
  //   icon: ICON.REPORT,
  //   children: [
  //     //PROJECT REPORT
  //     {
  //       name: MENU_NAME.PRJ_REPORT,
  //       url: URL.PRJ_REPORT,
  //       icon: ICON.PRJ_REPORT,
  //       authorities: [MENU_NAME.PRJ_REPORT],
  //       requiredRole: [
  //         ROLES.PRJ_GED_AUTHOR,
  //         ROLES.PRJ_PD_AND_TEAM_MEMBER,
  //         ROLES.PRJ_SECRETARY,
  //         ROLES.PRJ_SUPPER_ADMIN
  //       ]
  //     },
  //   ]
  // },
  // // MASTER SETTING
  // {
  //   name: MENU_NAME.MASTER_SETTING,
  //   url: URL.MASTER_SETTING,
  //   icon: ICON.MASTER_SETTING,
  //   children: [
  //   //  USER ROLES
  //     {
  //       name: MENU_NAME.USER_ROLES,
  //       url: URL.USER_ROLES,
  //       icon: ICON.USER_ROLES,
  //       authorities: [MENU_NAME.USER_ROLES],
  //       requiredRole: [
  //         ROLES.PRJ_GED_AUTHOR,
  //         ROLES.PRJ_PD_AND_TEAM_MEMBER,
  //         ROLES.PRJ_SECRETARY,
  //         ROLES.PRJ_SUPPER_ADMIN
  //       ]
  //     },
  //     //  USER PERMISSION
  //     {
  //       name: MENU_NAME.USER_PERMISSION,
  //       url: URL.USER_PERMISSION,
  //       icon: ICON.USER_PERMISSION,
  //       authorities: [MENU_NAME.USER_PERMISSION],
  //       requiredRole: [
  //         ROLES.PRJ_GED_AUTHOR,
  //         ROLES.PRJ_PD_AND_TEAM_MEMBER,
  //         ROLES.PRJ_SECRETARY,
  //         ROLES.PRJ_SUPPER_ADMIN
  //       ]
  //     },
  //  ]
  //}
];
