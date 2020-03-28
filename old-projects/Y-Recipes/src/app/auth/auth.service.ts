import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  // token will be stored in Local Storage and automatically added to requests by Firebase API
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.getToken();
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  signoutUser() {
    this.token = null;
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => {
        this.token = token;
      });

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
