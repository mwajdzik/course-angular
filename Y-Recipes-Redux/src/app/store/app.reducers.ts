import {shoppingListReducer, ShoppingListState} from '../shopping-list/store/shopping-list.reducers';
import {authReducer, AuthState} from '../auth/store/auth.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  auth: AuthState;
  shoppingList: ShoppingListState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  shoppingList: shoppingListReducer
};
