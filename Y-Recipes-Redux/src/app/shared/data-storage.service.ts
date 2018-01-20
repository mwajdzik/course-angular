import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {environment} from '../../environments/environment';

@Injectable()
export class DataStorageService {

  private config = environment.firebase;

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  private getRecipeUrl() {
    return this.config.databaseURL + '/angular-recipes-items.json';
  }

  public storeRecipes() {
    return this.httpClient.put(this.getRecipeUrl(), this.recipeService.getRecipes());
  }

  public getRecipes() {
    return this.httpClient.get(this.getRecipeUrl());
  }
}
