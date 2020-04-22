import {Action} from '@ngrx/store';
import {User} from "../user.model";

export const LOGIN_START = '[Auth] Login Start';
export const AUTH_SUCCESS = '[Auth] Login';
export const AUTH_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] SignUp Start';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const UNAUTHORIZED = '[Auth] Unauthorized';


export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public user: User) {
  }
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public error: string) {
  }
}

export class LogInStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}


export type AuthActions = AuthSuccess | AuthFail | LogOut | LogInStart | SignUpStart | AutoLogin;
