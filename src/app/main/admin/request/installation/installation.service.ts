import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  private readonly installationUrl: string = 'installation';
  private readonly reportDownloadUrl: string = 'file/download'
  private readonly reportUploadUrl: string = 'file'

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


  public updateInstallation(body): Observable<any> {
    return this.httpClient.put<any>(environment.baseApiUrl + this.installationUrl + "/" + this.installationId, body);
  }

   
  public uploadInstallationPhotos(body, params?:any, ): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("type", params.file);
    queryParams = queryParams.append("installationId",params.installationId);
    let headers = new HttpHeaders().set('Content-Type', "Multipart");
    // 'Content-Type':  'Multipart'
    return this.httpClient.post<any>(environment.baseApiUrl + this.reportUploadUrl, body ,{headers: headers, params: queryParams });

  }

  public downloadInstallationReport(params?:any): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("installationId",params.installationId);
    queryParams = queryParams.append("file",params.file);

    return this.httpClient.get<any>(environment.baseApiUrl + this.reportDownloadUrl , { params: queryParams });
  }
}
