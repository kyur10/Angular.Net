import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import {
  catchError,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { gotToken, loginSuccess } from '../../auth/state/auth.actions';

import { AppState } from '../../store/app.state';
import { AuthService, USER_DATA } from '../auth.service';

export interface InterceptorParams {
  req: HttpRequest<any>;
  next: HttpHandler;
}

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService,
    private _router: Router
  ) {}
  jwtHelper: JwtHelperService = new JwtHelperService();
  httpSub: Subscription;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.indexOf('getposts') > -1 ||
      req.url.indexOf('updatepost') > -1
    ) {
      let accessToken = this.accessToken({ req, next });
      // this.httpSub = accessToken.pipe().subscribe({
      //   error: (err) => {
      //     console.log(err, '<- auth endpoint error');
      //     if (err.status === 401) this.newRefreshToken({ req, next });
      //     return err;
      //   },
      // });
      return accessToken;
    }
    return next.handle(req);
    // return next.handle(req.clone({ withCredentials: true }));
    // return this.withCredentials({ req, next });
  }

  newRefreshToken({ req, next }: InterceptorParams) {
    return this._authService.getNewRefreshToken().subscribe((token: string) => {
      // debugger;
      this._authService.setUserInLocalStorage(token);
      this._store.dispatch(gotToken({ token }));
      return next.handle(req);
    });
  }

  accessToken({ req, next }: InterceptorParams) {
    let token: string = this._authService.getUserInLocalStorage();
    if (!token) {
      this._router.navigate(['/']);
      return throwError(() => 'Invalid call');
    }
    var isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (!isTokenExpired) {
      const modifiedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true,
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
    // return this.newAccessToken({ req, next });
  }

  private newAccessToken({ req, next }: InterceptorParams) {
    return this._authService.refresh().pipe(
      switchMap((token: string) => {
        this._authService.setUserInLocalStorage(token);
        this._store.dispatch(gotToken({ token }));
        const modifiedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
          withCredentials: true,
        });
        return next.handle(modifiedRequest);
      }),
      catchError((err) => {
        console.log(err, 'err on receiving jwt token ');
        return next.handle(req);
      })
    );
  }

  private withCredentials(
    { req, next }: InterceptorParams,
    headers?: HttpHeaders
  ) {
    let modifiedRequest = req.clone({
      withCredentials: true,
      headers,
    });
    return next.handle(modifiedRequest);
  }
}
