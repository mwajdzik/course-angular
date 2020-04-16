import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {

  private url = 'https://amw061-recipes.firebaseio.com/recipes.json';

  constructor(private http: HttpClient) {
  }

  fetchRecipes() {
    return this.http
      .get<{ [key: string]: RawRecipe }>(this.url)
      .pipe(
        map(res => {
          const result: Recipe[] = []
          for (const key in res) {
            result.push({...res[key], key});
          }
          return result;
        }),
        catchError((errorRes: HttpErrorResponse) => {
          // do some additional work with the error, eg. send to some analytics tool
          return throwError(errorRes);
        })
      );
  }

  postRecipe(recipe: RawRecipe) {
    return this.http
      .post<{ name: string }>(this.url, recipe);
  }

  deleteRecipes() {
    return this.http
      .delete(this.url);
  }
}

export interface RawRecipe {
  name: string,
  description: string
}

export interface Recipe extends RawRecipe {
  key: string
}
