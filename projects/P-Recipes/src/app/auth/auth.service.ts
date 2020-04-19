import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./User.model";
import {Router} from "@angular/router";

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

  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private route: Router) {
  }

  signUpUser(email: string, password: string) {
    const payload = {email, password, returnSecureToken: true};
    return this.http.post<AuthResponseData>(environment.firebase.signUpUrl, payload)
      .pipe(catchError(AuthService.handleError));
  }

  signInUser(email: string, password: string) {
    const payload = {email, password, returnSecureToken: true};
    return this.http.post<AuthResponseData>(environment.firebase.signInUrl, payload)
      .pipe(
        tap(res => {
          const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
          const user = new User(res.email, res.localId, res.idToken, expirationDate);
          this.user.next(user);
        }),
        catchError(AuthService.handleError));
  }

  private static handleError(errorRes: HttpErrorResponse) {
    switch (errorRes?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        return throwError('This email exists already')
      case 'INVALID_PASSWORD':
        return throwError('Invalid password')
      case 'USER_DISABLED':
        return throwError('The account is disabled')
    }

    return throwError(`An unknown error occurred ${errorRes?.error?.error?.message}`)
  }

  signOutUser() {
    this.user.next(null);
    this.route.navigate(['/signin'])
  }
}
