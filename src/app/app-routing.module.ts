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
        redirectTo: URL_NAME.OVERVIEW,
        pathMatch: 'full',
      },
      {
        path: URL_NAME.OVERVIEW,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/overview/overview.module').then(m => m.OverviewModule)
      },
      {
        path: URL_NAME.PRJ_DASHBOARD,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardComponentModule)
      },
      {
        path: URL_NAME.PRJ_ARTICLE,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/article/article.module').then(m => m.ArticleModule)
      },
      {
        path: URL_NAME.PRJ,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/prj-planning/prj-planning.module').then(m => m.PrjPlanningModule)
      },
      {
        path: URL_NAME.MASTER_SETTING,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/master-setting/master-setting.module').then(m => m.MasterSettingModule)
      },
      {
        path: URL_NAME.EMPLOYEE,
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/employee/employee.module').then(m => m.EmployeeModule)
      }
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
