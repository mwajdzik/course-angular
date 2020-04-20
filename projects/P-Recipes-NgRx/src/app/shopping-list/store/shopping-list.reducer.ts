import {Ingredient} from "../../shared/ingredient.model";
import * as ActionType from "./shopping-list.actions";
import {ShoppingListActions} from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: ShoppingListState;
}

const initialState: ShoppingListState = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListActions) {

  switch (action.type) {
    case ActionType.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      }
    }
    case ActionType.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
      }
    }
    case ActionType.UPDATE_INGREDIENT: {
      const updatedIngredients = [...state.ingredients];
      const ingredient = state.ingredients[state.editedIngredientIndex];
      updatedIngredients[state.editedIngredientIndex] = {...ingredient, ...action.ingredient};

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ActionType.DELETE_INGREDIENT: {
      const updatedIngredients = [...state.ingredients];
      updatedIngredients.splice(state.editedIngredientIndex, 1);

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case ActionType.START_EDIT_INGREDIENT: {
      return {
        ...state,
        editedIngredient: {...state.ingredients[action.index]},
        editedIngredientIndex: action.index
      };
    }
    case ActionType.STOP_EDIT_INGREDIENT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    default: {
      return state;
    }
  }
}
