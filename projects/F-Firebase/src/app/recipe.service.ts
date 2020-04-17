import {Injectable} from "@angular/core";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {

  private url = 'https://amw061-recipes.firebaseio.com/recipes.json';

  constructor(private http: HttpClient) {
  }

  fetchRecipes() {
    const headers = new HttpHeaders({
      'Custom-Header': 'hello'
    });

    const params = new HttpParams()
      .set('print', 'pretty');

    return this.http
      .get<{ [key: string]: RawRecipe }>(this.url, {headers, params})
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

  // observe - can be response, body, events
  postRecipe(recipe: RawRecipe) {
    return this.http
      .post<{ name: string }>(this.url, recipe, {observe: 'response'});
  }

  // responseType: json, arraybuffer, text, blob
  deleteRecipes() {
    return this.http
      .delete(this.url, {observe: 'events', responseType: 'json'})
      .pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Got a response!');
        }

        console.log(event);
      }));
  }
}

export interface RawRecipe {
  name: string,
  description: string
}

export interface Recipe extends RawRecipe {
  key: string
}
