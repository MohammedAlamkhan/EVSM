import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService as Notify } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly assetListUrl: string = 'asset?page=0&size=10&sort=id.DESC';


  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient
    , private notify: Notify) { }



  public getAssetsInformation(params?: any): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.assetListUrl, { params: params,  withCredentials: true });

  }
}