import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { EMPTY, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retryWhen, scan, tap } from 'rxjs/operators';
import { SalesObject, SalesRoot } from '../../../Models/Sales';
import { NotificationService as Notify } from '../../../shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private readonly closeSalesOrderUrl: string = 'salesorder/bystatus/Close';
  private readonly openSalesOrderUrl: string = 'salesorder/bystatus/Open';
  private readonly salesDetailsUrl: string = 'salesOrder/salesOrderNo/';
  private readonly assetListUrl: string = 'assests/items/';
  public selectedSalesOrder:any;

  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient
    , private notify: Notify) { }


    public getOpenSalesOrder(params?: any): Observable<any> {
      return this.httpClient.get<any>(environment.baseApiUrl + this.openSalesOrderUrl);
  
    }
    public getCloseSalesOrder(params?: any): Observable<any> {
      return this.httpClient.get<any>(environment.baseApiUrl + this.closeSalesOrderUrl);
  
    }


  getSalesDetails(soNumber: string): Observable<any> {
    return this.httpClient.get<Observable<any>>(environment.baseApiUrl + this.salesDetailsUrl + soNumber)
      .pipe(
        retryWhen((err) => err.pipe(
          scan((count) => {
            if (count > 5) {
              throw err;
            }
          })
        )),
        tap((x) => {
          this.salesInformation$.next(x);
        }),
        catchError((x: HttpErrorResponse) => {
          this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
          return EMPTY;
        }
        )
      )
  }

  public getSalesInformation(params?: any): Observable<SalesObject> {
    return this.httpClient.get<SalesObject>(environment.baseApiUrl + this.assetListUrl, { params: params });

  }
}
