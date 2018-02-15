import {getIsLoadingHandler, uiReducer, UiState} from './shared/ui.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface State {
  ui: UiState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer
};

export const getUiState = createFeatureSelector<UiState>('ui');
export const getIsLoading = createSelector(getUiState, getIsLoadingHandler);
