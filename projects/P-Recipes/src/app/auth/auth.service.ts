import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) {
  }

  signUpUser(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebase.signUpUrl,
      {email, password, returnSecurityToken: true})
      .pipe(catchError(
        errorRes => {
          switch (errorRes?.error?.error?.message) {
            case 'EMAIL_EXISTS':
              return throwError('This email exists already')
          }
          return throwError(`An unknown error occurred ${errorRes?.error?.error?.message}`)
        }
      ));
  }

  signInUser(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebase.signInUrl,
      {email, password, returnSecurityToken: true})
      .pipe(catchError(
        errorRes => {
          switch (errorRes?.error?.error?.message) {
            case 'INVALID_PASSWORD': return throwError('Invalid password')
            case 'USER_DISABLED': return throwError('The account is disabled')
          }
          return throwError(`An unknown error occurred ${errorRes?.error?.error?.message}`)
        }
      ));
  }

  signOutUser() {
    // this.token = null;
    // firebase.auth().signOut();
    // this.router.navigate(['/']);
  }

  getToken() {
    // firebase.auth().currentUser.getToken()
    //   .then((token: string) => {
    //     this.token = token;
    //   });
    //
    // return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
