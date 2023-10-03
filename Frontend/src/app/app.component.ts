import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { autoLogin } from './auth/state/auth.actions';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';
import { SharedState } from './store/shared/shared.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'reddyngrx';
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  constructor(private _store: Store<SharedState>) {}

  ngOnInit() {
    this.showLoading = this._store.select(getLoading);
    this.errorMessage = this._store.select(getErrorMessage);
    this._store.dispatch(autoLogin());
  }
}
