import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserDetails } from '../../app/Models/User';
import { environment } from '../../environments/environment';
import { NotificationService as Notify } from './../../../src/app/shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
export interface LoginContext {
  userId: string;
  password: string;
}
const credentialsKey = 'credentialsKey';
const serverTokenKey = '';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly userAuthRefreshEndpoint: string = 'refreshToken';
  _credentials: UserDetails | null;
  token: string = '';
  constructor(public httpClient: HttpClient, private router: Router, private notify: Notify) {

    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  readonly loginEndpoint: string = 'login';


  get servertoken() {
    return { token: this.token }
  }


  login(context: LoginContext): Observable<any> {

    return this.httpClient.post<any>(environment.baseApiUrl + this.loginEndpoint, context)
      .pipe(
        tap(x => {
          if (
            x.token != null
            && x.token !== undefined) {
            this.setCredentials(x);
          }
          else
            this.unSetCredentials();
        }),
        catchError((x: HttpErrorResponse) => {
            this.notify.show(x.error.message, NotificationType.Error);
            return EMPTY;
        })
      )
  }


  // testRefreshAPI(): Observable<any> {
  //   return this.httpClient.get<any>('http://localhost:59132/api/test/TestRefresh');
  // }

  testClients(): Observable<any> {
    return this.httpClient.get<any>(environment.baseApiUrl + 'clients');
  }



  setCredentials(credentials: UserDetails): void {
    this._credentials = credentials;
    localStorage.setItem(credentialsKey, JSON.stringify(credentials));
  }
  
  unSetCredentials(): void {
    this._credentials = null;
    localStorage.removeItem(credentialsKey);
  }
  get getCredentials(): any | null {
    return this._credentials;
  }


  isAuthenticated = (): boolean => {
    return !!this.getCredentials;
  }

  refresh(): Observable<UserDetails> {
    const refreshToken = this._credentials.token;
    return this.httpClient.get<UserDetails>(environment.baseApiUrl + this.userAuthRefreshEndpoint + '/' +refreshToken )
    .pipe(
      tap(response => {
        this.setCredentials(response);
      }),
      catchError(err => {
        throw err.error;
      })
    );
  }

  // refresh() {
  //   return this.httpClient.post<UserDetails>(environment.baseApiUrl + this.userAuthRefreshEndpoint,
  //     {
  //       Token: this._credentials.token,
  //       RefreshToken: this._credentials.refreshToken
  //     }
  //   ).pipe(
  //     tap(response => {
  //       this.setCredentials(response);
  //     }),
  //     catchError(err => {
  //       throw err.error;
  //     })
  //   );
  // }

  logOut(): void {
    this.unSetCredentials();
    this.router.navigate(['\login'], { replaceUrl: true })
  }

}
