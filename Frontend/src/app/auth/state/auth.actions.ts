import { createAction, props } from '@ngrx/store';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/User.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const LOGOUT_START = '[auth page] logout start';
export const LOGOUT_SUCCESS = '[auth page] logout success';
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const AUTO_LOGIN = '[auth page] auto login';
export const AUTO_LOGOUT = '[auth page] auto logout';
export const GOT_TOKEN = '[auth page] got token';

export const dummyAction = createAction('[dummy action]');
export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(AUTO_LOGOUT);

export const loginStart = createAction(LOGIN_START, props<{ email: string }>());
export const logoutStart = createAction(LOGOUT_START);
export const signUpStart = createAction(
  SIGNUP_START,
  props<{ email: string }>()
);

export const gotToken = createAction(GOT_TOKEN, props<{ token: string }>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ token: string; redirect: boolean }>()
);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const signUpSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ token: string; redirect: boolean }>()
);
