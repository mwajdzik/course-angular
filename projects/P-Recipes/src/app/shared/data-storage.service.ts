import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {environment} from "../../environments/environment";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

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
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            recipe.ingredients = recipe.ingredients || [];
            return recipe;
          });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }
}
