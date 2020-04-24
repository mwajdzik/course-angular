import {Recipe} from "../recipe.model";
import * as ActionType from "./recipe.actions";
import {RecipeActions} from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[]
}

const initialState: RecipeState = {
  recipes: []
}

export function recipeReducer(state: RecipeState = initialState, action: RecipeActions) {
  const result = _recipeReducer(state, action);
  console.log(`${action.type}: ${JSON.stringify(result)}`);
  return result;
}

function _recipeReducer(state: RecipeState = initialState, action: RecipeActions) {
  switch (action.type) {
    case ActionType.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.recipes]
      }
    }
    case ActionType.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      }
    }
    case ActionType.UPDATE_RECIPE: {
      const updatedRecipes = [...state.recipes];
      const recipe = state.recipes[action.index];
      updatedRecipes[action.index] = {...recipe, ...action.recipe};

      return {
        ...state,
        recipes: updatedRecipes
      };
    }
    case ActionType.DELETE_RECIPE: {
      const updatedRecipes = [...state.recipes];
      updatedRecipes.splice(action.index, 1);

      return {
        ...state,
        recipes: updatedRecipes
      };
    }
    default: {
      return state;
    }
  }
}
