import { NgModule } from '@angular/core';
import { CommissioningrequestModule } from './commissioning/commissioningrequest.module';
import { InstallationrequestModule } from './installation/installationrequest.module';
// import { IrfrequestModule } from './irf/irfrequest.module';
import { SurveyrequestModule } from './survey/surveyrequest.module';
 
@NgModule({
  declarations: [
  ],
  imports: [
    CommissioningrequestModule,
    InstallationrequestModule,
    // IrfrequestModule,
    SurveyrequestModule
  ]
})
export class RequestModule { }
