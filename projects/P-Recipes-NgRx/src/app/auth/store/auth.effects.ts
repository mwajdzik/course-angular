import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions"
import {AuthFail, AuthSuccess, LogInStart} from "./auth.actions"
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../user.model";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions,
              private route: Router,
              private http: HttpClient,
              private authService: AuthService) {
  }

  @Effect()
  authSignUp = this.actions.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: LogInStart) => {
      return this.http
        .post<AuthResponseData>(environment.firebase.signUpUrl, buildPayload(authData))
        .pipe(
          tap((authData) => this.setLogOutTimer(authData)),
          map(handleAuthentication),
          catchError(handleError)
        )
    })
  )

  @Effect()
  authLogIn = this.actions.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: LogInStart) => {
      return this.http
        .post<AuthResponseData>(environment.firebase.signInUrl, buildPayload(authData))
        .pipe(
          tap((authData) => this.setLogOutTimer(authData)),
          map(handleAuthentication),
          catchError(handleError)
        )
    })
  )

  @Effect()
  autoLogIn = this.actions.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: any =
        JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        const user = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate))
        const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();

        if (user.token) {
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthSuccess(user, false);
        }
      }

      return {type: AuthActions.UNAUTHORIZED};
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions.pipe(
    ofType(AuthActions.AUTH_SUCCESS, AuthActions.LOGOUT),
    tap((authAction: AuthSuccess) => {
      if (authAction.redirect) {
        this.route.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogOut = this.actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
    })
  );

  setLogOutTimer(resData) {
    const expirationDuration = +resData.expiresIn * 1000;
    this.authService.setLogoutTimer(expirationDuration);
  }
}

const buildPayload = (authData) => {
  return {
    email: authData.payload.email,
    password: authData.payload.password,
    returnSecureToken: true
  };
}

const handleAuthentication = (resData) => {
  const expirationDuration = +resData.expiresIn * 1000;
  const expirationDate = new Date(new Date().getTime() + expirationDuration);
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthSuccess(user, true);
}

const handleError = (errorRes: HttpErrorResponse) => {
  switch (errorRes?.error?.error?.message) {
    case 'EMAIL_EXISTS':
      return of(new AuthFail('This email exists already'));
    case 'INVALID_PASSWORD':
      return of(new AuthFail('Invalid password'));
    case 'USER_DISABLED':
      return of(new AuthFail('The account is disabled'));
    default:
      return of(new AuthFail(`An unknown error occurred ${errorRes?.error?.error?.message}`));
  }
}

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
