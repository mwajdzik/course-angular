import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {Logout, SetToken, SignIn, SignUp} from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.retrieveToken();
        this.navigateAndDispatch(new SignUp());
      })
      .catch(error => console.log(error));
  }

  // token will be stored in Local Storage and automatically added to requests by Firebase API
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.retrieveToken();
        this.navigateAndDispatch(new SignIn());
      })
      .catch(error => console.log(error));
  }

  signoutUser() {
    firebase.auth().signOut();
    this.navigateAndDispatch(new Logout());
  }

  private navigateAndDispatch(action) {
    this.router.navigate(['/']);
    this.store.dispatch(action);
  }

  private retrieveToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => {
        this.store.dispatch(new SetToken(token));
      });
  }
}
