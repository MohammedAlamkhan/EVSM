import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';
import { environment } from 'environments/environment';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService as Notify } from './../../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  private readonly installationUrl: string = 'installation';
  private readonly reportDownloadUrl: string = 'installation/file/download'
  private readonly reportUploadUrl: string = 'installation/file'
  private readonly siteurl: string='customer/address/search';
  private readonly reassignUrl: string = 'installation/reassign';
  private readonly engineerUrl: string = 'user/engineer/';
  private readonly toBeApprovedUrl: string = 'tobeapproved/';
  private readonly installationToBeApprovedUrl: string = 'tobeapproved/installation';
  public selectedInstall:any;
  public installationId:any;


  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient , private notify: Notify
   ) { }



  public getInstallationInformation(qp): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", qp.page);
    queryParams = queryParams.append("size", qp.size);
    queryParams = queryParams.append("sort", "created_date,DESC");
  
    return this.httpClient.get<any>(environment.baseApiUrl + this.installationUrl, {params: queryParams});

  }

  public getInstallationListToBeApproved(qp): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", qp.page);
    queryParams = queryParams.append("size", qp.size);
    queryParams = queryParams.append("sort", "installationCreatedDate,DESC");
  
    return this.httpClient.get<any>(environment.baseApiUrl + this.installationToBeApprovedUrl, {params: queryParams});

  }

  
  public getEngineerMap(circleId): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.engineerUrl + circleId);

  }

  public getInstallationInformationById(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.installationUrl + "/" + this.installationId);

  }
  
 
  public  approveRejectInstallation(req): Observable<any> {
    return this.httpClient.put<any>(environment.baseApiUrl + this.toBeApprovedUrl + req.id, req).pipe(
      tap((x) => {
        if (x != null && x !== undefined) {
          this.notify.show("Approved Successfully.", NotificationType.Info);
          
        }
      }),
      catchError((x: HttpErrorResponse) => {
        if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
          this.notify.show(x.error.message, NotificationType.Error)
        }
        else
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })
  
    );
  }

  public reassignInstallation(searchquery): Observable<any> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("id", searchquery.id);
    // queryParams = queryParams.append("engineerId", searchquery.engineerId);
    return this.httpClient.post<any>(environment.baseApiUrl + this.reassignUrl+"?id="+searchquery.id+"&engineerId="+searchquery.engineerId,null).pipe(
      tap((x) => {
        if (x != null && x !== undefined) {
          this.notify.show("Assigned Successfully.", NotificationType.Info);
          
        }
      }),
      catchError((x: HttpErrorResponse) => {
        if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
          this.notify.show(x.error.message, NotificationType.Error)
        }
        else
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })
  
    );
  }

  public getSiteData(searchquery): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search", searchquery);
    return this.httpClient.get<any>(environment.baseApiUrl + this.siteurl, {params: queryParams});
  }


  public updateInstallation(body): Observable<any> {
    return this.httpClient.put<any>(environment.baseApiUrl + this.installationUrl + "/" + this.installationId, body).pipe(
      tap((x) => {
        if (x != null && x !== undefined) {
          this.notify.show("Installation Updated Successfully.", NotificationType.Info);
          
        }
      }),
      catchError((x: HttpErrorResponse) => {
        if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
          this.notify.show(x.error.message, NotificationType.Error)
        }
        else
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })

    );
  }

   
  public uploadInstallationPhotos(file: FormData, params?:any, ): Observable<any> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("type", params.file);
    // queryParams = queryParams.append("installationId",params.installationId);
    // let head = new HttpHeaders().append('Content-Type', "multipart/form-data");
  
    // 'Content-Type':  'Multipart'
    return this.httpClient.post<any>(environment.baseApiUrl + this.reportUploadUrl + "?type=" + params.file + "&installationId=" + params.installationId, file).pipe(
      tap((x) => {
        if (x != null && x !== undefined) {
          this.notify.show(params.file+"Uploaded Successfully.", NotificationType.Info);
          
        }
      }),
      catchError((x: HttpErrorResponse) => {
        if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
          this.notify.show(x.error.message, NotificationType.Error)
        }
        else
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })

    );

  }

  public downloadInstallationReport(params?:any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("installationId",params.installationId);
    queryParams = queryParams.append("file",params.file);

    return this.httpClient.get<any>(environment.baseApiUrl + this.reportDownloadUrl , { params: queryParams }).pipe(
      tap((x) => {
        if (x != null && x !== undefined) {
          this.notify.show(params.file+"Downloaded Successfully.", NotificationType.Info);
          
        }
      }),
      catchError((x: HttpErrorResponse) => {
        if (x.status == AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR) {
          this.notify.show(x.error.message, NotificationType.Error)
        }
        else
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })
  
    );
  }
}
