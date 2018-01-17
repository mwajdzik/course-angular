import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  // token will be stored in Local Storage and automatically added to requests by Firebase API
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
  }
}
