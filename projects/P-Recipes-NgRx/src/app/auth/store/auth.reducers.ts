import {AUTH_FAIL, AUTH_SUCCESS, AuthActions, LOGIN_START, LOGOUT, SIGNUP_START} from './auth.actions';
import {User} from "../user.model";

export interface AuthState {
  user: User,
  error: string,
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {
  const result = _authReducer(state, action);
  console.log(`${action.type}: ${JSON.stringify(result)}`);
  return result;
}

export function _authReducer(state: AuthState = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false
      };
    }
    case AUTH_FAIL: {
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
