import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    new Recipe('Pork', 'A tasty one',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Meet', 1), new Ingredient('French Fries', 20)]),
    new Recipe('Chicken', 'A tasty one',
      'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/3:2/w_1280,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg',
      [new Ingredient('Meet', 1), new Ingredient('Potato', 5)])
  ];

  private recipeSelected = new EventEmitter<Recipe>();

  public getRecipes() {
    return this.recipes.slice();
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public getRecipeSelected() {
    return this.recipeSelected;
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
