import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { EMPTY, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retryWhen, scan, tap } from 'rxjs/operators';
import { NotificationService as Notify } from '../../shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
 private readonly bulkIrfUrl = 'irf/bulk';
 private readonly singleIrfUrl = 'irf';
 getInformationListUrl : string = 'installation/'
 circleMapUrl: string = 'circle/list'

  constructor(private httpClient: HttpClient
    , private notify: Notify) { }

    postBulkIrf(context: any): Observable<any> {
      return this.httpClient.post<any>(environment.baseApiUrl + this.bulkIrfUrl, context)
        .pipe(
          tap((x) => {
            if (x != null && x !== undefined) {
              this.notify.show("IRF Created Successfully.", NotificationType.Info);
              
            }
          }),
          catchError((x: HttpErrorResponse) => {
            if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
              this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error)
            }
            else
              this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
              return EMPTY;
          })
  
        );
    }

    postSingleIrf(context: any): Observable<any> {
      return this.httpClient.post<any>(environment.baseApiUrl + this.singleIrfUrl, context)
        .pipe(
          tap((x) => {
            if (x != null && x !== undefined) {
              this.notify.show("IRF Created Successfully.", NotificationType.Info);
              
            }
          }),
          catchError((x: HttpErrorResponse) => {
            if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
              this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error)
            }
            else
              this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
              return EMPTY;
          })
  
        );
    }

getInstallationListInApproval(params?: any):Observable<any>
{
  return this.httpClient.get<any>(environment.baseApiUrl + this.getInformationListUrl, { params: params });
}

getCircleMap():Observable<any>
{
  return this.httpClient.get<any>(environment.baseApiUrl + this.circleMapUrl);
}


}
