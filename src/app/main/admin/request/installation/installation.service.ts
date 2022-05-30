import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  private readonly installationUrl: string = 'installation';
  public selectedInstall:any;
  public installationId:any;


  salesInformation$ = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient
   ) { }



  public getInstallationInformation(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.installationUrl);

  }

  
  public getInstallationInformationById(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + this.installationUrl + "/" + this.installationId);

  }
}
