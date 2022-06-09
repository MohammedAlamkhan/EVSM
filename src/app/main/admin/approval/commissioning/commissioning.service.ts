import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private readonly openCommisioningDetailsUrl: string = 'commissioning';
  
  private readonly userGetAllEngineerUrl: string = 'user/getAllEngineer/';
  private readonly featchCommisioningDetailsUrl: string = 'commissioning/';
  private readonly checkProductSerialNoUrl: string='commission/checkProductSerialNo/';
  private readonly SiteIDSearchUrl: string= 'customer/address/';
 
  // private readonly ApprovalModerateUrl: string= 'commission/approval'
  private readonly ApprovalModerateUrl: string= 'tobeapproved'
  private readonly featchAssignDetailsUrl: string = '/commissioning/reassign';

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
        this.notify.show(x.error.message, NotificationType.Error);
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
        this.notify.show(x.error.message, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }

  public getAssign(value: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.featchAssignDetailsUrl + value).pipe(
      catchError((x: HttpErrorResponse) => {
        this.notify.show(x.error.message, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }


  public getSiteIDSearch(value: string): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.SiteIDSearchUrl + `search?search=${value}`).pipe(
      catchError((x: HttpErrorResponse) => {
        this.notify.show(x.error.message, NotificationType.Error);
        return EMPTY;
      }
      )
    );

  }

  // public PostCommisioningForm1(params: any): Observable<any> {
  //   return this.httpClient.put<any>(environment.baseApiUrl + this.featchCommisioningDetailsUrl,params)
    
    
  //   .pipe(
  //     catchError((x: HttpErrorResponse) => {
  //       this.notify.show(x.error.message, NotificationType.Error);
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
  //           this.notify.show(x.error.message, NotificationType.Error);
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
          debugger;
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
            this.notify.show(x.error.message, NotificationType.Error);
            return EMPTY;
        })

      );

  }
  public getCheckProductSerial(params: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.checkProductSerialNoUrl + params)
    
    
    .pipe(
    
      catchError((x: HttpErrorResponse) => {
        this.notify.show(x.error.message, NotificationType.Error);
        return EMPTY;
      }
      ),
   
    );

  }

}
