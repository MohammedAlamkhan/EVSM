import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { LogoutComponent } from './logout.component';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutComponent,
    data: { animation: 'logout' }
  }
];
@NgModule({
  declarations: [LogoutComponent],
  imports: [RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule]
})
export class LogoutModule { }
