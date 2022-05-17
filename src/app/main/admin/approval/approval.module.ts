import { NgModule } from '@angular/core';
import { CommissioningModule } from './commissioning/commissioning.module';
import { InstallationModule } from './installation/installation.module';
import { SurveyModule } from './survey/survey.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [

  ],
  imports: [
    SharedModule,
    InstallationModule,
    SurveyModule,
    CommissioningModule

  ]
})
export class ApprovalModule { }
