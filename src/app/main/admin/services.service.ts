import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
 getInformationListUrl : string = 'installation'
 circleMapUrl: string = 'circle/list'
 requestRaisedByUrl: string = 'contact/list'

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

getInstallationListInApproval(qp):Observable<any>
{ let queryParams = new HttpParams();
  queryParams = queryParams.append("page", qp.page);
  queryParams = queryParams.append("size", qp.size);
  queryParams = queryParams.append("sort", "id");

  return this.httpClient.get<any>(environment.baseApiUrl + this.getInformationListUrl, { params: queryParams });
}

getCircleMap():Observable<any>
{
  return this.httpClient.get<any>(environment.baseApiUrl + this.circleMapUrl);
}

getRequestRaisedById():Observable<any>
{
  return this.httpClient.get<any>(environment.baseApiUrl + this.requestRaisedByUrl);
}


}
