import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TrySignIn} from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private store: Store<AppState>) {
  }

  onSignIn(form: NgForm) {
    this.store.dispatch(new TrySignIn({userName: form.value.email, password: form.value.password}));
  }
}
