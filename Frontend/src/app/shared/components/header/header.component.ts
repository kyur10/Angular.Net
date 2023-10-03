import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { getAuthenticated } from 'src/app/auth/state/auth.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this._store.select(getAuthenticated);
  }

  onLogOut(event: Event) {
    event.preventDefault();
    this._store.dispatch(autoLogout());
  }
}
