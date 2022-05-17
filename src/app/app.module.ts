import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FakeDbService } from '@fake-db/fake-db.service';
import 'hammerjs';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { AdminModule } from './main/admin/admin.module';
import { AuthLoginV2Component } from './main/pages/authentication/auth-login-v2/auth-login-v2.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from './shared/shared.module';


const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./main/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'approval',
    loadChildren: () => import('./main/admin/approval/approval.module').then(m => m.ApprovalModule)
  },
  {
    path: 'installation',
    loadChildren: () => import('./main/admin/approval/installation/installation.module').then(m => m.InstallationModule)
  },
  {
    path: 'commissioning',
    loadChildren: () => import('./main/admin/approval/commissioning/commissioning.module').then(m => m.CommissioningModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./main/admin/request/request.module').then(m => m.RequestModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./main/admin/request/survey/surveyrequest.module').then(m => m.SurveyrequestModule)
  },
  {
    path: 'installation',
    loadChildren: () => import('./main/admin/request/installation/installationrequest.module').then(m => m.InstallationrequestModule)
  },
  {
    path: 'commissioning',
    loadChildren: () => import('./main/admin/request/commissioning/commissioningrequest.module').then(m => m.CommissioningrequestModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'login',
    component: AuthLoginV2Component
  },
  {
    path: '',
    redirectTo: '/pages/authentication/login-v2',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    // SampleModule,
    AdminModule,
    SharedModule
   
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
