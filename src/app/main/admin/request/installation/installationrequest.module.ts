import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SharedModule } from 'app/shared/shared.module';
import { InstallationComponent } from './installation.component';

const routes: Routes = [
  {
    path: 'installation',
    component: InstallationComponent,
    data: { animation: 'installation' }
  }
];
@NgModule({
  declarations: [InstallationComponent],
  imports: [RouterModule.forChild(routes),
    NgbModule, 
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    SharedModule
 ]
})
export class InstallationrequestModule { }
