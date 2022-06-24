import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService as Notify } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly assetListUrl: string = 'asset';
  private readonly sicUrl: string = 'asset/sic/count';
  

  public selectedAsset:any;


  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient
    , private notify: Notify) { }



  public getAssetsInformation(qp): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", qp.page);
    queryParams = queryParams.append("size", qp.size);
    queryParams = queryParams.append("sort", "created_date,DESC");
  
    return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl, {params: queryParams});

  }

  public getSingleAssetsInformation(id): Observable<any> {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("page", qp.page);
    // queryParams = queryParams.append("size", qp.size);
    // queryParams = queryParams.append("sort", "id");
  
    return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl+ "/" +id);

  }

  public  getSICCount(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.sicUrl);
  }
}
