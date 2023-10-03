import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { getAuthenticated, getAuthToken } from '../auth/state/auth.selectors';
import { AppState } from '../store/app.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _store: Store<AppState>, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this._store.select(getAuthenticated).pipe(
      map((isAuthD: boolean) => {
        if (!isAuthD) {
          return this._router.createUrlTree(['auth', 'login']);
        }
        return true;
      })
    );
  }
}
