import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {StoreState} from './app.module';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="onStartLoadingClick()">Start</button>
      <button (click)="onStopLoadingClick()">Stop</button>
    </div>
    <div>
      <div>{{state}}</div>
      <div>{{isLoading}}</div>
      <div>{{isLoading$ | async}}</div>
    </div>
  `
})
export class AppComponent implements OnInit {

  isLoading$;
  isLoading;
  state;

  constructor(private store: Store<StoreState>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store
      .map(state => state.ui.isLoading);

    this.store.subscribe(data => {
      this.isLoading = data.ui.isLoading;
      this.state = JSON.stringify(data);
    });
  }

  onStartLoadingClick() {
    this.store.dispatch({type: 'START_LOADING'});
  }

  onStopLoadingClick() {
    this.store.dispatch({type: 'STOP_LOADING'});
  }
}
