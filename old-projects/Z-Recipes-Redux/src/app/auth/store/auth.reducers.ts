import {AuthActions, LOGOUT, SET_TOKEN, SIGN_IN, SIGN_UP} from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        authenticated: true
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}
