import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  getAllUsersUrl = 'user/';
  createUserUrl = 'login/create'
  changePasswordUri = 'user/changepassword'
  resetPasswordUri = 'user/resetpassword'
  enableUri = 'user/enabledisable'
  selectedUser: Observable<any>;

  constructor(private httpClient: HttpClient, 
    private notify: Notify, private router: Router,
    private _coreSidebarService: CoreSidebarService) { }

  getAllUsers(params?: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.getAllUsersUrl, { params: params });
  }

  getUser(id): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.getAllUsersUrl+id);
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
            this.notify.show(x.error.message, NotificationType.Error)
          }
          else
            this.notify.show(x.error.message, NotificationType.Error);
            this.toggleSidebar('new-user-sidebar');
            return EMPTY;
        })

      );
  }

  changePassword(context: any): Observable<any> {
    return this.httpClient.put<any>(environment.baseApiUrl + this.changePasswordUri, context)
      .pipe(
        tap((x) => {
          if (x != null && x !== undefined) {
            this.notify.show("Password Changed Successfully.", NotificationType.Info);
            this.toggleSidebar('change-password-sidebar');
          }
        }),
        catchError((x: HttpErrorResponse) => {
          if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
            this.notify.show(x.error.message, NotificationType.Error)
          }
          else
            this.notify.show(x.error.message, NotificationType.Error);
            this.toggleSidebar('change-password-sidebar');
            return EMPTY;
        })

      );
  }

  resetPassword(context: any): Observable<any> {
    return this.httpClient.put<any>(environment.baseApiUrl + this.resetPasswordUri, context)
      .pipe(
        tap((x) => {
          if (x != null && x !== undefined) {
            this.notify.show("Password Reset Successfully.", NotificationType.Info);
            this.toggleSidebar('reset-password-sidebar');
          }
        }),
        catchError((x: HttpErrorResponse) => {
          if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
            this.notify.show(x.error.message, NotificationType.Error)
          }
          else
            this.notify.show(x.error.message, NotificationType.Error);
            this.toggleSidebar('reset-password-sidebar');
            return EMPTY;
        })

      );
  }

  enableDisbaleUser(req: any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", req.userId);
    queryParams = queryParams.append("enableFlag", req.enableFlag);
    return this.httpClient.put<any>(environment.baseApiUrl + this.enableUri+"?userId="+req.userId+"&enableFlag="+req.enableFlag , null)
      .pipe(
        tap((x) => {
          if (x != null && x !== undefined) {
            this.notify.show("Operation Successfully.", NotificationType.Info);
            this.router.navigate(['\manage-user'], { replaceUrl: true })
            // this.toggleSidebar('reset-password-sidebar');
          }
        }),
        catchError((x: HttpErrorResponse) => {
          if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
            this.notify.show(x.error.message, NotificationType.Error)
          }
          else
            this.notify.show(x.error.message, NotificationType.Error);
            // this.toggleSidebar('reset-password-sidebar');
            return EMPTY;
        })

      );
  }


  getRoles(req): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "user/search/role?searchKey=" + req);
  }

  getProfiles(req): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "user/search/profile?searchKey=" + req);
  }

  getManagers(req): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "user/search/manager?searchKey=" + req);
  }

  getAccounts(req): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "account/search?searchKey=" + req);
  }

  getCircles(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "circle/list");
  }

  getContacts(searchkeyword,accountId): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + "contact/search?searchKey="+searchkeyword+"&accountId="+accountId);
  }

}
