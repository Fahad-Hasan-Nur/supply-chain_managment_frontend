import { Admin } from './common/model/admin';
import {BrowserModule, HAMMER_LOADER} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {AppComponent} from './app.component';
import {DatePipe} from '@angular/common';

// Import containers
import {DefaultLayoutComponent} from './containers';
import {AppSidebarModule} from './core/sidebar';
import {AppBreadcrumbModule} from './core/breadcrumb';
import {AppAsideModule, AppFooterModule, AppHeaderModule} from '@coreui/angular';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {DemoMaterialModule} from './material.module';
import {MAT_DATE_LOCALE, MatPaginatorIntl, DateAdapter} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

import { P404Component } from './common/component/error/404.component';
import { P500Component } from './common/component/error/500.component';
import { ThemeService } from 'ng2-charts';
//import { httpInterceptorProviders } from './common/service/auth/auth-interceptor';
import { getBnPaginatorIntl } from './bn-paginator-intl';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { UnauthorizedComponent } from './common/component/error/unauthorized.component';
import {UserTestComponent} from "./common/component/error/user-test.component";
import { FormsModule } from '@angular/forms';
import { Auth } from './common/model/auth';
import { WelcomeComponent } from './common/component/welcome/welcome.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    UnauthorizedComponent,
    UserTestComponent,
    WelcomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    HttpClientModule,
    DemoMaterialModule,
    BsDropdownModule.forRoot(),
    NgbDropdownModule,
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    Auth,Admin,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: MAT_DATE_LOCALE,useValue: 'es-ES'},
    {provide: LOCALE_ID, useValue: 'es-ES'},
    {provide: MatPaginatorIntl, useValue: getBnPaginatorIntl()},
    ThemeService,DatePipe,
      {
        provide: HAMMER_LOADER,
        useValue: () => new Promise(() => {
        })
      }],
    bootstrap: [AppComponent]

})
export class AppModule { }
