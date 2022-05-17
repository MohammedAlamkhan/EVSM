import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
 
import { ChartsModule } from 'ng2-charts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  }
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [RouterModule.forChild(routes), NgbModule, 
    CoreCommonModule, 
    ContentHeaderModule,
    CardSnippetModule,
    ChartsModule,
    Ng2FlatpickrModule,
    CoreCommonModule
  ]
})
export class HomeModule { }
