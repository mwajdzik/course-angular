import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {RecipeFeatureState} from './recipe.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {

  constructor(private httpClient: HttpClient,
              private store: Store<RecipeFeatureState>,
              private actions: Actions,
              private router: Router) {
  }

  @Effect()
  recipeFetch = this.actions
    .ofType(FETCH_RECIPES)
    .switchMap((action: FetchRecipes) => {
      return this.httpClient.get(this.getRecipeUrl());
    })
    .map((recipes) => {
      this.router.navigate(['/recipes']);
      return {type: SET_RECIPES, payload: recipes};
    });

  @Effect({dispatch: false})
  recipeStore = this.actions
    .ofType(STORE_RECIPES)
    .withLatestFrom(this.store.select('recipe'))
    .switchMap(([action, state]) => {
      return this.httpClient.put(this.getRecipeUrl(), state.recipes);
    });

  private getRecipeUrl() {
    return environment.firebase.databaseURL + '/angular-recipes-items.json';
  }
}
