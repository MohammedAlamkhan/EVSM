import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { EMPTY, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retryWhen, scan, shareReplay, tap } from 'rxjs/operators';
import { NotificationService as Notify } from 'app/shared/services/notification.service';

import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';
import { Router } from '@angular/router';

@Injectable(

  { providedIn: 'root'}
)

export class CommissioningService {
  public irfId;
  public selectedIrf:any;
  private readonly openCommisioningDetailsUrl: string = 'commissioning';
  
  private readonly userGetAllEngineerUrl: string = 'user/getAllEngineer/';
  private readonly featchCommisioningDetailsUrl: string = 'commissioning/';
 // private readonly checkProductSerialNoUrl: string='commission/checkProductSerialNo/';
 private readonly checkProductSerialNoUrl: string='asset/search/list/';
 private readonly checkProductUrl: string='product/search/list/';
 partcode
  private readonly SiteIDSearchUrl: string= 'customer/address/';
 
  // private readonly ApprovalModerateUrl: string= 'commission/approval'
  private readonly ApprovalModerateUrl: string= 'tobeapproved'
  private readonly featchAssignDetailsUrl: string = '/commissioning/reassign';
  private readonly featCommissionImagesUrl: string = 'commissioning/file';
  private readonly circleMapUrl: string = 'circle/list'
  private readonly reassignUrl: string = 'commissioning/reassign';
  private readonly toBeApprovedUrl: string = 'tobeapproved/';
  private readonly assetListUrl: string = 'irf';
  private readonly engineerUrl: string = 'user/engineer/';
  private readonly reportDownloadUrl: string = 'commissioning/file/download'
  private readonly comtoBeApprovedUrl: string = 'commissioning/tobeapproved';
  private readonly comtoBeAssignedUrl: string = 'commissioning/reassign';
  constructor(private httpClient: HttpClient, 
    
    private notify: Notify, private _Router: Router) { }
 
  public getCommisioning(params?: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.openCommisioningDetailsUrl, { params: params }).pipe(
      retryWhen((err) => err.pipe(
        scan((count) => {
          if (count > 5) {
            throw err;
          }
        })
      )),
    
      catchError((x: HttpErrorResponse) => {
        this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }
   
  
  public getAllEng(params?: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.userGetAllEngineerUrl, { params: params });

  }


  public getCommisioningDeatil(value: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.featchCommisioningDetailsUrl + value).pipe(
      catchError((x: HttpErrorResponse) => {
        this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }

  // public getAssign(value: string): Observable<any> {
  //   return this.httpClient.get<any>(environment.baseApiUrl + this.featchAssignDetailsUrl + value).pipe(
  //     catchError((x: HttpErrorResponse) => {
  //       this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
  //       return EMPTY;
  //     }
  //     )
  //   );

  // }


  public getSiteIDSearch(value: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.SiteIDSearchUrl + `search?search=${value}`,{ observe: 'response' }).pipe(
      tap((x) => {
     
        if (x != null && x !== undefined && x.status === 200) {
        
        }
        else
        {
         
          this.notify.show(x.statusText, NotificationType.Error);
        }
      }),
      catchError((x: HttpErrorResponse) => {
        this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }

  // public PostCommisioningForm1(params: any): Observable<any> {
  //   return this.httpClient.put<any>(environment.baseApiUrl + this.featchCommisioningDetailsUrl,params)
    
    
  //   .pipe(
  //     catchError((x: HttpErrorResponse) => {
  //       this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
  //       return EMPTY;
  //     }
  //     )
  //   );

  // }

  PostCommisioningForm(commissionId:string,params?:any): Observable<any> {
    return this.httpClient.put<any>(`${environment.baseApiUrl + this.featchCommisioningDetailsUrl + commissionId}`, params,{ observe: 'response' }) 
  
    .pipe(
      shareReplay(),
      tap((x) => {
     
        if (x != null && x !== undefined && x.status === 200) {
          this.notify.show("Data submitted successfully", NotificationType.Info);
          this._Router.navigate(['/request/commissioning']);
        }
        else
        {
         
          this.notify.show(x.statusText, NotificationType.Error);
        }
      }),
      
      catchError((x: HttpErrorResponse) => {
    
          this.notify.show(x.error.message, NotificationType.Error);
          return EMPTY;
      })

    );
  }
  //v1 public putApprovalModerate(commissionId,Approvalremarks,approvalStatus,RequestType): Observable<any> {
  //   return this.httpClient.put<any>(`${environment.baseApiUrl  + this.ApprovalModerateUrl}/${Approvalremarks}/${approvalStatus}/${RequestType}/${commissionId}`,{
  //      })
  //      .pipe(
  //       shareReplay(),
  //       tap((x) => {
  //         debugger;
  //         if (x ??  x.statusCode === "600") {
  //           this.notify.show(x.error.message, NotificationType.Info);
  //           this._Router.navigate(['/approval/commissioning']);
  //         }
  //         else
  //         {
  //           this.notify.show(x.error.message, NotificationType.Error);
  //         }
  //       }),
        
  //       catchError((x: HttpErrorResponse) => {
  //           this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
  //           return EMPTY;
  //       })

  //     );

  // }

  public putApprovalModerate(jsonObject,id): Observable<any> {
    return this.httpClient.put<any>(`${environment.baseApiUrl  + this.ApprovalModerateUrl}/${id}`,jsonObject,{
       })
       .pipe(
        shareReplay(),
        tap((x) => {
        
          if (x ??  x.statusCode === "600") {
            this.notify.show(x.error.message, NotificationType.Info);
            this._Router.navigate(['/approval/commissioning']);
          }
          else
          {
            this.notify.show(x.error.message, NotificationType.Error);
          }
        }),
        
        catchError((x: HttpErrorResponse) => {
            this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
            return EMPTY;
        })

      );

  }
  public getCheckProductSerial(accountId:any,productId: any,serialno:any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.checkProductSerialNoUrl + "?accountId=" + accountId + "&productId=" + productId + "&search=" + serialno)
    
    
    .pipe(
    
      catchError((x: HttpErrorResponse) => {
        this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
        return EMPTY;
      }
      ),
   
    );

  }

  public getCheckProduct(params: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.checkProductUrl + "?search=" + params )
    
    
    .pipe(
    
      catchError((x: HttpErrorResponse) => {
        this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
        return EMPTY;
      }
      ),
   
    );

  }
  public uploadCommissionPhotos(file: FormData, params?:any, ): Observable<any> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("type", params.file);
    // queryParams = queryParams.append("installationId",params.installationId);
    // let head = new HttpHeaders().append('Content-Type', "multipart/form-data");
  
    // 'Content-Type':  'Multipart'
    return this.httpClient.post<any>(environment.baseApiUrl + this.featCommissionImagesUrl + "?type=" + params.file + "&commissioningId=" + params.commissioningId, file);
    

  }

  
getCircleMap():Observable<any>
{
  return this.httpClient.get<any>(environment.baseApiUrl + this.circleMapUrl);
}

// getRequestRaisedById():Observable<any>
// {
//   return this.httpClient.get<any>(environment.baseApiUrl + this.requestRaisedByUrl);
// }
public reassignInstallation(searchquery): Observable<any> {
  // let queryParams = new HttpParams();
  // queryParams = queryParams.append("id", searchquery.id);
  // queryParams = queryParams.append("engineerId", searchquery.engineerId);
  return this.httpClient.post<any>(environment.baseApiUrl + this.reassignUrl+"?id="+searchquery.id+"&engineerId="+searchquery.engineerId,null);
}
public  approveRejectCommision(req): Observable<any> {
  return this.httpClient.put<any>(environment.baseApiUrl + this.toBeApprovedUrl + req.id, req);
}
public getEngineerMap(circleId): Observable<any> {
  return this.httpClient.get<any>(environment.baseApiUrl + this.engineerUrl + circleId);

}
public downloadInstallationReport(params?:any): Observable<any> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("id",params.id);
  queryParams = queryParams.append("file",params.file);

  return this.httpClient.get<any>(environment.baseApiUrl + this.reportDownloadUrl , { params: queryParams });
}

public getIrfInformationById(): Observable<any> {
  return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl + "/" +  this.irfId);
}

public  approveRejectCommissioning(req): Observable<any> {
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

public reassignCommisioning(searchquery): Observable<any> {
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


public getCommissioningListToBeApproved(qp): Observable<any> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("page", qp.page);
  queryParams = queryParams.append("size", qp.size);
  queryParams = queryParams.append("sort", "commissioningCreatedDate,DESC");

  return this.httpClient.get<any>(environment.baseApiUrl + this.comtoBeApprovedUrl, {params: queryParams});

}

public getCommissioningListToBeAssigned(qp): Observable<any> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("page", qp.page);
  queryParams = queryParams.append("size", qp.size);
  queryParams = queryParams.append("sort", "commissioningCreatedDate,DESC");

  return this.httpClient.get<any>(environment.baseApiUrl + this.comtoBeAssignedUrl, {params: queryParams});

}

}
