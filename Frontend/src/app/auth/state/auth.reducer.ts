import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  loginStart,
  signUpSuccess,
  autoLogout,
  logoutSuccess,
  gotToken,
} from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(gotToken, (state, action) => {
    return { ...state, token: action.token };
  }),
  on(loginSuccess, (state, action) => {
    return { ...state, token: action.token };
  }),
  on(signUpSuccess, (state, action) => {
    return { ...state, token: action.token };
  }),
  on(autoLogout, (state) => {
    console.log('clearing state on auto logout');
    return { ...state, token: null };
  }),
  on(logoutSuccess, (state) => {
    console.log('clearing state on manual logout');
    return { ...state, token: null };
  })
  // on(loginStart, (state) => {
  //   return { ...state };
  // }),
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
