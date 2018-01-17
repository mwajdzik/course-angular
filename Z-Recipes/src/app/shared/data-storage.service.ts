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

  storeRecipes() {
    return this.httpClient.put(this.config.databaseURL + '/angular-recipes-items.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.httpClient.get(this.config.databaseURL + '/angular-recipes-items.json');
  }
}
