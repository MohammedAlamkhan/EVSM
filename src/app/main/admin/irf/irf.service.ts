import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService as Notify } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class IrfService {
  private readonly assetListUrl: string = 'irf';
  public irfId;
  public selectedIrf:any;


  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient
    , private notify: Notify) { }



  public getIrfInformation(qp): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", qp.page);
    queryParams = queryParams.append("size", qp.size);
    queryParams = queryParams.append("sort", "created_date,DESC");
  
    return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl, {params: queryParams});

  }

  public getIrfInformationById(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl + "/" +  this.irfId);
  }
}
