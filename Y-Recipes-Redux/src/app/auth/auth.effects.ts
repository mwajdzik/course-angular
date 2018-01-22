import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LOGOUT, SET_TOKEN, SIGN_IN, SIGN_UP, TRY_SIGN_IN, TRY_SIGN_UP, TrySignIn, TrySignUp} from './store/auth.actions';
import {fromPromise} from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions
    .ofType(TRY_SIGN_UP)
    .map((action: TrySignUp) => action.payload)
    .switchMap((authData: { userName: string, password: string }) => {
      return fromPromise(firebase.auth()
        .createUserWithEmailAndPassword(authData.userName, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);

      return [
        {type: SIGN_UP},
        {type: SET_TOKEN, payload: token}
      ];
    });

  @Effect()
  authSignin = this.actions
    .ofType(TRY_SIGN_IN)
    .map((action: TrySignIn) => action.payload)
    .switchMap((authData: { userName: string, password: string }) => {
      return fromPromise(firebase.auth()
        .signInWithEmailAndPassword(authData.userName, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);

      return [
        {type: SIGN_IN},
        {type: SET_TOKEN, payload: token}
      ];
    });


  @Effect({dispatch: false})
  authLogout = this.actions
    .ofType(LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

  constructor(private actions: Actions,
              private router: Router) {
  }
}
