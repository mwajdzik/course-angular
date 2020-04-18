import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  private config = environment.firebase;

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  private getRecipeUrl() {
    return this.config.databaseURL + '/recipes.json'
  }

  public storeRecipes() {
    return this.httpClient
      .put(this.getRecipeUrl(), this.recipeService.getRecipes())
      .subscribe(() => {
        console.log('Recipes stored');
      })
  }

  public getRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.getRecipeUrl())
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
