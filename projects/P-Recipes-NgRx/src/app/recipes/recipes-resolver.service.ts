import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {FetchRecipes, SET_RECIPES} from "./store/recipe.actions";
import {map, switchMap, take} from "rxjs/operators";
import {AppState} from "../store/app.reducer";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<AppState>,
              private actions: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipe').pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new FetchRecipes());

          return this.actions.pipe(
            ofType(SET_RECIPES),
            take(1)
          )
        } else {
          return of(recipes);
        }
      })
    )
  }
}
