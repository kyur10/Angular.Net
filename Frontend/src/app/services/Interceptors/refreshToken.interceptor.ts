import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { gotToken } from 'src/app/auth/state/auth.actions';

import { getAuthToken } from '../../auth/state/auth.selectors';
import { AppState } from '../../store/app.state';
import { AuthService } from '../auth.service';
import { InterceptorParams } from './accessToken.interceptor';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor, OnDestroy {
  constructor(
    private _store: Store<AppState>,
    private _authService: AuthService
  ) {}
  jwtHelper: JwtHelperService = new JwtHelperService();
  httpSub: Subscription;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req, '<-- sent request');

    this.httpSub = next.handle(req).subscribe({
      next: (v) => console.log(v, 'sds'),
      error: (err) => {
        console.log(err, 'sds');
        if (err.status === 401) this.newRefreshToken({ req, next });
        return err;
      },
    });

    return next.handle(req);

    let BearerTokenFromStore = this.BearerTokenFromStore({ req, next });
    return BearerTokenFromStore;
  }

  ngOnDestroy(): void {
    this.httpSub.unsubscribe();
  }

  newRefreshToken({ req, next }: InterceptorParams) {
    return this._authService.getNewRefreshToken().subscribe((token: string) => {
      debugger;
      this._authService.setUserInLocalStorage(token);
      this._store.dispatch(gotToken({ token }));
      return next.handle(req);
    });
  }

  BearerTokenFromStore({ req, next }: InterceptorParams) {
    return this._store.select(getAuthToken).pipe(
      // take(1),
      exhaustMap((jwtToken: string) => {
        console.log(jwtToken, 'sent this jwt token');
        let modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${jwtToken}`),
        });
        return next.handle(modifiedReq);
      }),
      catchError((err) => {
        console.log(err, 'local token sending error');
        return next.handle(req);
      })
    );
  }
}
