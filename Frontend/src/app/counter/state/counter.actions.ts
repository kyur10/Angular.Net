import { createAction, props } from '@ngrx/store';

export const INCREMENT_COUNTER = 'increment';
export const DECREMENT_COUNTER = 'decrement';
export const RESET_COUNTER = 'reset';
export const CHANNEL_COUNTER = 'channel';
export const CUSTOM_INCREMENT_COUNTER = 'customIncrement';

export const increment = createAction(INCREMENT_COUNTER);
export const decrement = createAction(DECREMENT_COUNTER);
export const reset = createAction(RESET_COUNTER);
export const channel = createAction(CHANNEL_COUNTER);
export const customIncrement = createAction(
  CUSTOM_INCREMENT_COUNTER,
  props<{ counter: number }>()
);
