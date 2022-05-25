import { NgModule } from '@angular/core';
import { ApprovalModule } from './approval/approval.module';
import { AssetsitemsModule } from './assetsitems/assetsitems.module';
import { LogoutModule } from './logout/logout.module';
import { ManageusersModule } from './manageuser/manageusers.module';
import { ReportsModule } from './reports/reports.module';
import { RequestModule } from './request/request.module';
import { SalesModule } from './sales/sales.module';
import { IrfDetailsComponent } from './irf-details/irf-details.component'
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CommanAssetsComponent } from './comman-assets/comman-assets.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';
import { InstallReqFormDetailComponent } from './install-req-form-detail/install-req-form-detail.component';
import { InstallReqFormComponent } from './install-req-form/install-req-form.component';
import { EditIrfComponent } from './edit-irf/edit-irf.component';
import { CommissionDetailsComponent } from './commission-details/commission-details.component';
import { CommissionFormComponent } from './commission-form/commission-form.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { EvReportPdfComponent } from './ev-report-pdf/ev-report-pdf.component';
import { SurveyPdfComponent } from './survey-pdf/survey-pdf.component';
import { FileUploadModule } from 'ng2-file-upload';
import { IrfModule } from './irf/irf.module';
import { AccountModule } from './accounts/accounts.module';
import { HomeModule } from './home/home.module';
import { CommanAccountsComponent } from './comman-account/comman-accounts.component';
const routes: Routes = [
  {
    path: 'irf-details',
    component: IrfDetailsComponent,
    data: { animation: 'irfdetails' }
  },
  {
    path: 'comp-assets',
    component: CommanAssetsComponent,
    data: { animation: 'assets' }
  },
  {
    path: 'comp-accounts',
    component: CommanAccountsComponent,
    data: { animation: 'accounts' }
  },
  {
    path: 'survey-form',
    component: SurveyFormComponent,
    data: { animation: 'surveyForm' }
  },
  {
    path: 'survey-details',
    component: SurveyDetailsComponent,
    data: { animation: 'survey-details' }
  },
  {
    path: 'install-req-form',
    component: InstallReqFormComponent,
    data: { animation: 'install-form' }
  },
  {
    path: 'edit-irf',
    component: EditIrfComponent,
    data: { animation: 'editIrf' }
  },
  {
    path: 'install-req-form-details',
    component: InstallReqFormDetailComponent,
    data: { animation: 'install-form-detail' }
  },
  {
    path: 'commission-details',
    component: CommissionDetailsComponent,
    data: { animation: 'commissionDetails' }
  },
  {
    path: 'commission-form',
    component: CommissionFormComponent,
    data: { animation: 'commissionForm' }
  },
  {
    path: 'survey-pdf',
    component: SurveyPdfComponent,
    data: { animation: 'surveyPdf' }
  },
  {
    path: 'Installation-commissioning-pdf',
    component: EvReportPdfComponent,
    data: { animation: 'install&coommissionPdf' }
  },

];
@NgModule({
  declarations: [
    IrfDetailsComponent,
    CommanAssetsComponent,
    CommanAccountsComponent,
    SurveyFormComponent,
    SurveyDetailsComponent,
    InstallReqFormDetailComponent,
    InstallReqFormComponent,
    EditIrfComponent,
    CommissionDetailsComponent,
    CommissionFormComponent,
    EvReportPdfComponent,
    SurveyPdfComponent,

  ],
  imports: [
    SalesModule,
    RequestModule,
    ApprovalModule,
    AssetsitemsModule,
    ReportsModule,
    LogoutModule,
    ManageusersModule,
    RouterModule.forChild(routes),
    NgbModule, CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    Ng2FlatpickrModule,
    FileUploadModule,
    IrfModule,
    AccountModule,
    HomeModule
  ],

})
export class AdminModule { }