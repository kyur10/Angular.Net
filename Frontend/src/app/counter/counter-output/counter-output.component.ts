import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  // counter: number;
  counter$: Observable<number>;
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    // this._store.select('counter').subscribe((v) => {
    //   this.counter = v.counter;
    // });
    this.counter$ = this._store.select(getCounter);
  }
}
