import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipeActions from "./recipe.actions"
import {SetRecipes} from "./recipe.actions"
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {

  constructor(private actions: Actions,
              private http: HttpClient,
              private store: Store<AppState>) {
  }

  @Effect()
  fetchRecipes = this.actions.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(RecipeEffects.getRecipeUrl())
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients || []
        }
      });
    }),
    map(recipes => {
      return new SetRecipes(recipes);
    })
  )

  @Effect({dispatch: false})
  storeRecipes = this.actions.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([, recipesState]) => {
      return this.http.post<Recipe[]>(RecipeEffects.getRecipeUrl(), recipesState.recipes)
    })
  )

  private static getRecipeUrl() {
    return environment.firebase.databaseUrl + '/recipes.json'
  }
}
