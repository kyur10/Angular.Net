import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

const getCounterState = createFeatureSelector<CounterState>('counter');

export const getCounter = createSelector(
  getCounterState,
  (state) => state.counter
);

export const getChannel = createSelector(
  getCounterState,
  (state) => state.channel
);
