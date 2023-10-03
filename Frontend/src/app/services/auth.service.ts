import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { catchError, map, of, Subscription, switchMap, tap } from 'rxjs';

import { autoLogout, gotToken } from '../auth/state/auth.actions';
import { AppState } from '../store/app.state';
import { setErrorMessage } from '../store/shared/shared.action';

export const USER_DATA = 'userData';

@Injectable()
export class AuthService implements OnDestroy {
  constructor(private _http: HttpClient, private _store: Store<AppState>) {}
  timeOutInterval: any;
  httpSub: Subscription;
  jwthelper: JwtHelperService = new JwtHelperService();
  url: string = `https://localhost:7029/api/user`;

  login(userName: string) {
    let res = this._http.post(
      `${this.url}/login`,
      { userName },
      {
        withCredentials: true,
        responseType: 'text',
        headers: new HttpHeaders().append('foo', 'bar'),
      }
    );
    return res;
  }

  refresh() {
    let res = this._http.post(
      `${this.url}/refresh`,
      {},
      { withCredentials: true, responseType: 'text' }
    );
    return res;
  }

  getNewRefreshToken(isJwt?: boolean) {
    let res = this._http.post(
      `${this.url}/newrefresh`,
      { isJwt },
      { withCredentials: true, responseType: 'text' }
    );
    return res;
  }

  register(userName: string, isJwt?: boolean) {
    let res = this._http.post(
      `${this.url}/register`,
      { userName, isJwt },
      { responseType: 'text' }
    );
    return res;
  }

  logout() {
    let res = this._http.post(
      `${this.url}/logout`,
      {},
      { withCredentials: true }
    );
    return res;
  }

  setUserInLocalStorage(token: string) {
    localStorage.setItem(USER_DATA, JSON.stringify(token));
    this.runTimeInterval(token);
  }

  getUserInLocalStorage(): string | null {
    const userDataString = localStorage.getItem(USER_DATA);
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // this.runTimeInterval(userData);
      return userData;
    }
    return null;
  }

  logoutUser() {
    console.log('logging out');
    localStorage.removeItem(USER_DATA);
    if (this.timeOutInterval) {
      clearTimeout(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }

  private runTimeInterval(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    let isExpired = this.jwthelper.isTokenExpired(token);

    /* jwt.exp ->[seconds], .getTime() ->[milliseconds] */
    // const tokenTime = decoded.exp * 1000;
    // const todayTime: number = new Date().getTime();
    let timeInterval = isExpired
      ? null
      : decoded.exp * 1000 - new Date().getTime();
    // console.log(timeInterval);

    this.timeOutInterval = setTimeout(() => {
      //  auto logout
      console.log('sending refresh req/');
      this.autoRefresh();
      // this._store.dispatch(autoLogout());
    }, timeInterval);
  }

  autoRefresh() {
    this.httpSub = this.refresh().subscribe({
      next: (token: string) => {
        this.onGettingNewToken(token);
      },
      error: (err) => {
        if (err.status === 403) {
          this.getNewRefreshToken().subscribe((token: string) => {
            this.onGettingNewToken(token);
          });
        } else this._store.dispatch(autoLogout());
      },
      complete: () => console.log('refresh token completed'),
    });
  }

  private onGettingNewToken(token: string) {
    this.setUserInLocalStorage(token);
    this._store.dispatch(gotToken({ token }));
  }

  ngOnDestroy(): void {
    debugger;
    this.httpSub.unsubscribe();
  }
}
