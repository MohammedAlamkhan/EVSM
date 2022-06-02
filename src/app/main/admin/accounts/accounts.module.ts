import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: 'accounts',
    component: AccountComponent,
    data: { animation: 'accounts' }
  }
];

@NgModule({
  declarations: [
    AccountComponent
  ],

  imports: [RouterModule.forChild(routes),
     NgbModule, 
     CoreCommonModule,
     ContentHeaderModule,
     CardSnippetModule,
     SharedModule
  ]

})
export class AccountModule { }
