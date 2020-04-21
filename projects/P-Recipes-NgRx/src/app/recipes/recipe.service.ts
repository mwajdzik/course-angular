import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {AddIngredients} from "../shopping-list/store/shopping-list.actions";
import {AppState} from "../store/app.reducer";

@Injectable({providedIn: 'root'})
export class RecipeService {

  private recipesChanged = new Subject<Recipe[]>();

  constructor(private store: Store<AppState>) {
  }

  private recipes: Recipe[] = [];

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public hasRecipes() {
    return this.recipes.length > 0;
  }

  public getRecipe(index: number) {
    return this.recipes[index];
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  public getRecipesChanged() {
    return this.recipesChanged;
  }

  public addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }

  public editRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  public deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
