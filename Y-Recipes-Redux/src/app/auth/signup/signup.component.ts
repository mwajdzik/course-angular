import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {TrySignUp} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private store: Store<AppState>) {
  }

  onSignUp(form: NgForm) {
    this.store.dispatch(new TrySignUp({userName: form.value.email, password: form.value.password}));
  }
}
