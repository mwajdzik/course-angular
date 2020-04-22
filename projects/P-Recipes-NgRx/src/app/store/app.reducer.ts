import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";
import {authReducer, AuthState} from "../auth/store/auth.reducers";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: AuthState,
  shoppingList: ShoppingListState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
}
