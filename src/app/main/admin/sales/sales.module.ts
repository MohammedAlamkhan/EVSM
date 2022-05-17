import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SalesComponent } from './sales.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { AuthGuard as Guard } from '@core/core/auth.guard';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [Guard] ,
    data: { animation: 'sales' }
  },
    // {
    //   path: 'sales/sales-details',
    //   component: SalesDetailsComponent,
    //   data: { animation: 'sales-details' }
    // },
  {
    path: 'sales/sales-details/:salesOrderNo',
    component: SalesDetailsComponent,
    data: { animation: 'sales-details' }
  },
 
 
 

];

@NgModule({
  declarations: [SalesComponent, SalesDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule, CardSnippetModule]
})
export class SalesModule {}
