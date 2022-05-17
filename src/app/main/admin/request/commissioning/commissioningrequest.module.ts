import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CommissioningComponent } from './commissioning.component'
const routes: Routes = [
  {
    path: 'commissioning',
    component: CommissioningComponent ,
    data: { animation: 'commissioning' }
  }
];


@NgModule({
  declarations: [CommissioningComponent],
  imports: [RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule]
})
export class CommissioningrequestModule { }
