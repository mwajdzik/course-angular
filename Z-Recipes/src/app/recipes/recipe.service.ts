import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService {
  private recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe #1', 'This is a simple description', 'https://www.bbcgoodfood.com/sites/default/files/' +
      'recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg', null),
    new Recipe('Recipe #2', 'This is another description', 'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/' +
      'exps25157_FM153592B03_18_12b.jpg', null)
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getSelectedRecipeEmitter() {
    return this.recipeSelected;
  }
}
