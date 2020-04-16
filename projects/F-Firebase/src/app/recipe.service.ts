import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

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
      .pipe(map(res => {
        const result: Recipe[] = []
        for (const key in res) {
          result.push({...res[key], key});
        }
        return result;
      }));
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
