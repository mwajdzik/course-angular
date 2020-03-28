import {START_LOADING, STOP_LOADING, UiActions} from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true};
    case STOP_LOADING:
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export const getIsLoadingHandler = (state: UiState) => state.isLoading;
