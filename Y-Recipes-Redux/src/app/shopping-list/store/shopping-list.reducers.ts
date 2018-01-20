import {Ingredient} from '../../shared/ingredient.model';
import {
  ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, ShoppingListActions,
  START_EDIT_INGREDIENT, STOP_EDIT_INGREDIENT, UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface AppState {
  shoppingList: ShoppingListState;
}

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {...ingredient, ...action.payload};
      const ingredients1 = [...state.ingredients];
      ingredients1[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients1,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case DELETE_INGREDIENT:
      const ingredients2 = [...state.ingredients];
      ingredients2.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ingredients2,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case START_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: {...state.ingredients[action.payload]}, // !!!
        editedIngredientIndex: action.payload
      };

    case STOP_EDIT_INGREDIENT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default:
      return state;
  }
}
