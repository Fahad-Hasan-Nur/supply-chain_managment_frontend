import { ROLES } from './common/constant/nav.constant';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './common/component/error/404.component';
import { P500Component } from './common/component/error/500.component';
import { AuthGuard } from './common/service/auth/auth.guard';
import { URL_NAME } from '../app/common/constant/nav.constant'
import { UnauthorizedComponent } from './common/component/error/unauthorized.component';
import {UserTestComponent} from "./common/component/error/user-test.component";

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: URL_NAME.PRODUCT,
        pathMatch: 'full',
      },
    
      // {
      //   path: URL_NAME.OVERVIEW,
      //  // canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/overview/overview.module').then(m => m.OverviewModule)
      // },
      {
        path: URL_NAME.CATEGORY,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: URL_NAME.SUB_CATEGORY,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/sub-category/sub-category.module').then(m => m.SubCategoryModule)
      },
      {
        path: URL_NAME.EMPLOYEE,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule),
        // data: { roles: [ROLES.SUPER_ADMIN]}
      },
      {
        path: URL_NAME.PRODUCT,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule)
      },
      {
        path: URL_NAME.BRAND,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/brand/brand.module').then(m => m.BrandModule),
        // data: { roles: [ROLES.ADMIN,ROLES.SUPER_ADMIN]}
      },
    
      // {
      //   path: URL_NAME.PRJ,
      // //  canActivate: [AuthGuard],
      //   loadChildren: () => import('./views/prj-planning/prj-planning.module').then(m => m.PrjPlanningModule)
      // },
    //   {
    //     path: URL_NAME.EMPLOYEE,
    //  //   canActivate: [AuthGuard],
    //     loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule)
    //   }
    ],
  },
  {
    path: 'not-found',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'page-not-found',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'Page 403'
    }
  },
  {
    path: 'service-test',
    component: UserTestComponent,
    data: {
      title: 'Server Test'
    }
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    paramsInheritanceStrategy: 'always',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('app-module loaded');
  }
}
