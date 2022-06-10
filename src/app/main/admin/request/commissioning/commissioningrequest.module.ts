import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CommissioningComponent } from './commissioning.component'
import { CommissionDetailsComponent } from '../../commission-details/commission-details.component';
import { CommissionFormComponent } from '../../commission-form/commission-form.component';
import { SharedModule } from 'app/shared/shared.module';
const routes: Routes = [
  {
    path: 'commissioning',
    component: CommissioningComponent ,
    data: { animation: 'commissioning' },
    
  },
  {
    path: 'commission/commission-details/:commissionId',
    component: CommissionDetailsComponent,
    
  },

  {
    path: 'commission-details/commission-form/:commissionId',
    component: CommissionFormComponent,
    
  },
];


@NgModule({
  declarations: [CommissioningComponent],
  imports: [SharedModule,RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule]
})
export class CommissioningrequestModule { }
