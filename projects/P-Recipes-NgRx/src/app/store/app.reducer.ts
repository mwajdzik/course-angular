import {shoppingListReducer, ShoppingListState} from "../shopping-list/store/shopping-list.reducer";
import {authReducer, AuthState} from "../auth/store/auth.reducers";
import {ActionReducerMap} from "@ngrx/store";
import {recipeReducer, RecipeState} from "../recipes/store/recipe.reducer";

export interface AppState {
  auth: AuthState,
  recipe: RecipeState,
  shoppingList: ShoppingListState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  recipe: recipeReducer,
  auth: authReducer,
}
