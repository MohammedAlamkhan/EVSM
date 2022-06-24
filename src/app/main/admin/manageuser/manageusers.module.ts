import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SharedModule } from 'app/shared/shared.module';
import { ManageuserComponent } from './manageuser.component';

import { ChangePasswordSidebarComponent } from './change-password-sidebar/change-password-sidebar.component';
import { NewUserSidebarComponent } from './new-user-sidebar/new-user-sidebar.component';
import {CommanUserComponent} from './comman-user/comman-user.component'
import { ResetPasswordSidebarComponent } from './reset-password-sidebar/reset-password-sidebar.component';
import { CoreSidebarModule } from '@core/components';
const routes: Routes = [
  {
    path: 'manage-user',
    component: ManageuserComponent,
    data: { animation: 'manage-user' }
  }
];

@NgModule({
  declarations:[ManageuserComponent, NewUserSidebarComponent, ChangePasswordSidebarComponent, ResetPasswordSidebarComponent,CommanUserComponent],

  imports: [RouterModule.forChild(routes),
     NgbModule, 
     CoreCommonModule,
     ContentHeaderModule,
     CardSnippetModule,
     CoreSidebarModule,
     SharedModule
  ]

})
export class ManageusersModule { }
