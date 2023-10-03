import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthenticated = createSelector(getAuthState, (state) => {
  return state.token ? true : false;
});

export const getAuthToken = createSelector(getAuthState, (state) => {
  let stateUser = state.token;
  if (stateUser) {
    debugger;
    return stateUser;
  }
  return null;
});
