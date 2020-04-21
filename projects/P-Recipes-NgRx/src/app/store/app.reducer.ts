import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: ShoppingListState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
}
