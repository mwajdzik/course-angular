import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
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
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private route: Router) {
  }

  public signUpUser(email: string, password: string) {
    const payload = {email, password, returnSecureToken: true};
    return this.http.post<AuthResponseData>(environment.firebase.signUpUrl, payload)
      .pipe(catchError(AuthService.handleError));
  }

  public logInUser(email: string, password: string) {
    const payload = {email, password, returnSecureToken: true};
    return this.http.post<AuthResponseData>(environment.firebase.signInUrl, payload)
      .pipe(
        tap(res => {
          const expirationDuration = +res.expiresIn * 1000;
          const expirationDate = new Date(new Date().getTime() + expirationDuration);
          const user = new User(res.email, res.localId, res.idToken, expirationDate);

          this.user.next(user);
          this.autoLogout(expirationDuration);

          localStorage.setItem('user', JSON.stringify(user));
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

  public autoLogin() {
    const userData: any = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate))
    if (user.token) {
      this.user.next(user);

      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logoutUser();
    }, expirationDuration);
  }

  public logoutUser() {
    this.user.next(null);
    localStorage.removeItem('user');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.route.navigate(['/auth', 'signin'])
  }
}
