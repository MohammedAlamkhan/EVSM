import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserDetails } from '../../app/Models/User';
import { Router } from '@angular/router';


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
  constructor(public httpClient: HttpClient, private router: Router) {

    const savedCredentials = localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  readonly loginEndpoint: string = 'generate-token';


  get servertoken() {
    return { token: this.token }
  }


  login(context: LoginContext): Observable<UserDetails> {

    return this.httpClient.post<UserDetails>(environment.baseApiUrl + this.loginEndpoint, context)
      .pipe(
        tap(x => {
          if (
            x.fcmToken != null
            && x.fcmToken !== undefined) {
            this.setCredentials(x);
          }
          else
            this.unSetCredentials();
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
  get getCredentials(): UserDetails | null {
    return this._credentials;
  }


  isAuthenticated = (): boolean => {
    return !!this.getCredentials;
  }

  refresh(): Observable<UserDetails> {
    const refreshToken = this._credentials.fcmToken;
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
  //       Token: this._credentials.fcmToken,
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
