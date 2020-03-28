import {getIsLoadingHandler, uiReducer, UiState} from './shared/ui.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {authReducer, AuthState, getIsAuthenticatedHandler} from './auth/auth.reducer';

export interface State {
  ui: UiState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  auth: authReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');
export const getIsLoading = createSelector(getUiState, getIsLoadingHandler);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, getIsAuthenticatedHandler);
