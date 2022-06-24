import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class TokensInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationService,private router: Router,) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.authService.getCredentials != null && this.authService.getCredentials.token && request.headers.getAll('authorization') == null) {
      request= this.addToken(request, this.authService.getCredentials.token);
    }

    return next.handle(request).pipe(catchError(error => {
      
      if (error instanceof HttpErrorResponse && error.status === 401 && this.authService.getCredentials != null) {
        this.router.navigate(['\login'])
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }))as Observable<HttpEvent<any>>;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.router.navigate(['\login'])
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((credentials: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(credentials.token);
          return next.handle(this.addToken(request, credentials.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(x => {
          return next.handle(this.addToken(request, x));
        }));
    }
  }
}
