import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Token } from 'src/app/models/token.model';

import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  autoLogout,
  signUpStart,
  signUpSuccess,
  dummyAction,
  logoutStart,
  logoutSuccess,
} from './auth.actions';

@Injectable()
export class AuhtEffects {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this._authService.login(action.email).pipe(
          map((token) => {
            console.log(token);
            this._store.dispatch(setLoadingSpinner({ status: false }));
            this._store.dispatch(setErrorMessage({ message: '' }));
            this._authService.setUserInLocalStorage(token);
            return loginSuccess({ token, redirect: true });
          }),
          catchError((err) => {
            this._store.dispatch(setLoadingSpinner({ status: false }));
            console.log(err, 'error');
            return of(setErrorMessage({ message: err.message }));
          })
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this._authService.register(action.email).pipe(
          map((token) => {
            this._store.dispatch(setLoadingSpinner({ status: false }));
            this._store.dispatch(setErrorMessage({ message: '' }));
            this._authService.setUserInLocalStorage(token);
            console.log(token);
            return signUpSuccess({ token, redirect: true });
          }),
          catchError((err) => {
            this._store.dispatch(setLoadingSpinner({ status: false }));
            console.log(err, 'error');
            return of(setErrorMessage({ message: err.message }));
          })
        );
      })
    );
  });

  autoLogOut$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(...[autoLogout, logoutStart]),
      exhaustMap(() => {
        return this._authService.logout().pipe(
          map(() => {
            this._authService.logoutUser();
            this._router.navigate(['auth/login']);
            return logoutSuccess();
          }),
          catchError((err) => {
            this._store.dispatch(setLoadingSpinner({ status: false }));
            console.log(err, 'error');
            return of(setErrorMessage({ message: err.message }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(autoLogin),
      exhaustMap((action) => {
        const token = this._authService.getUserInLocalStorage();
        if (token) {
          console.log(token);
          return of(loginSuccess({ token, redirect: false }));
        }
        return of();
      })
    );
  });

  authRedirect$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(...[signUpSuccess, loginSuccess]),
        tap((action) => {
          this._store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) this._router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
