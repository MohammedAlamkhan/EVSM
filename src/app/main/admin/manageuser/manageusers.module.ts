import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ManageuserComponent } from './manageuser.component';
import { NewUserSidebarComponent } from './new-user-sidebar/new-user-sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { UserListService } from './user-list.service';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: 'manage-user',
    component: ManageuserComponent,
    data: { animation: 'manage-user' }
  }
];

@NgModule({
  declarations: [ManageuserComponent, NewUserSidebarComponent],
  imports: [RouterModule.forChild(routes),
    NgbModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    FormsModule,
    NgSelectModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    SharedModule
  ],
  providers: []
})
export class ManageusersModule { }
