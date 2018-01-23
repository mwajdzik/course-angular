import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

// added because this module is lazy loaded
export interface RecipeFeatureState {
  recipe: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger', 'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {...recipe, ...action.payload.updatedRecipe};
      const recipes1 = [...state.recipes];
      recipes1[action.payload.index] = updatedRecipe;
      return {...state, recipes: recipes1};

    case DELETE_RECIPE:
      const recipes2 = [...state.recipes];
      recipes2.splice(action.payload, 1);
      return {...state, recipes: recipes2};

    default:
      return state;
  }
}
