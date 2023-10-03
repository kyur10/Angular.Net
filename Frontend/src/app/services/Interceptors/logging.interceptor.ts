import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';

import { AppState } from '../../store/app.state';
import { InterceptorParams } from './accessToken.interceptor';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}
  // constructor(private _store: Store<AppState>, private _router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let logResponse = this.LogResponse({ req, next });
    return logResponse;
  }

  LogResponse({ req, next }: InterceptorParams) {
    return next.handle(req).pipe(
      tap((event) => {
        // console.log(e,'every http event');
        switch (event.type) {
          case HttpEventType.Response:
            // console.log(event, '<-- response');
            break;
          default:
            console.log(event, '<-- response');
            break;
        }
        return event;
      })
    );
  }
}
