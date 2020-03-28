import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {environment} from '../../../../Y-Recipes/src/environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  private config = environment.firebase;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private recipeService: RecipeService) {
  }

  private getRecipeUrl() {
    return this.config.databaseURL + '/angular-recipes-items.json?auth=' + this.authService.getToken();
  }

  public storeRecipes() {
    return this.httpClient.put(this.getRecipeUrl(), this.recipeService.getRecipes());
  }

  public getRecipes() {
    return this.httpClient.get(this.getRecipeUrl());
  }
}
