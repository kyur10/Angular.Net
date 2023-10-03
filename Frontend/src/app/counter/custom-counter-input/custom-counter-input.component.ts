import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { channel, customIncrement } from '../state/counter.actions';
import { getChannel } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  channel$: Observable<string>;
  constructor(private _store: Store<CounterState>) {}

  ngOnInit(): void {
    this.channel$ = this._store.select(getChannel);
  }

  onClick() {
    this._store.dispatch(customIncrement({ counter: +this.value }));
  }

  onChannelClick() {
    this._store.dispatch(channel());
  }
}
