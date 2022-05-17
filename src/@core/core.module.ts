import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CORE_CUSTOM_CONFIG } from '@core/services/config.service';
import { TokensInterceptor } from '../@core/core/tokens.interceptor';
import {AuthenticationService} from '../@core/core/authentication.service';
import {AuthGuard} from '../@core/core/auth.guard';
import {AuthorizationService} from '../@core/core/authorization.service';
@NgModule(
  {
    imports: [CommonModule, HttpClientModule, RouterModule],
    providers: [
      AuthenticationService,
      AuthGuard,
      AuthorizationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokensInterceptor,
        multi: true
      }
    ]
  }
)





export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Import CoreModule in the AppModule only');
    }
  }

  static forRoot(config): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: CORE_CUSTOM_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
