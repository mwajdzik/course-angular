import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private loggedIn = false;

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAuthenticated() {
    console.log('isAuthenticated');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 500);
    });
  }
}
