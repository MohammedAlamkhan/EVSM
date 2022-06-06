import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AllUsers } from 'app/Models/User';
import { AppConstants } from 'app/shared/AppConstants';
import { AnyARecord } from 'dns';
import { environment } from 'environments/environment';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { UserDetails } from '../../../Models/User';
import { NotificationService as Notify } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  getAllUsersUrl = 'user/';
  createUserUrl = 'user/'

  constructor(private httpClient: HttpClient, 
    private notify: Notify,
    private _coreSidebarService: CoreSidebarService) { }

  getAllUsers(params?: any): Observable<AllUsers> {
    return this.httpClient.get<AllUsers>(environment.baseApiUrl + this.getAllUsersUrl, { params: params });
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  postUser(context: any): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(environment.baseApiUrl + this.createUserUrl, context)
      .pipe(
        tap((x) => {
          if (x != null && x !== undefined) {
            this.notify.show("User Created Successfully.", NotificationType.Info);
            this.toggleSidebar('new-user-sidebar');
          }
        }),
        catchError((x: HttpErrorResponse) => {
          if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
            this.notify.show(x.message, NotificationType.Error)
          }
          else
            this.notify.show(x.message, NotificationType.Error);
            this.toggleSidebar('new-user-sidebar');
            return EMPTY;
        })

      );
  }

}
