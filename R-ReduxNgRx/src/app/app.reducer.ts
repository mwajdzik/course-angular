export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

// takes the old state and the action
// returns a new state
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {...state, isLoading: true};
    case 'STOP_LOADING':
      return {...state, isLoading: false};
    default:
      return state;
  }
}
