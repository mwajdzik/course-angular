import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

export interface RawRecipe {
  name: string,
  description: string
}

export interface Recipe extends RawRecipe {
  key: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private url = 'https://amw061-recipes.firebaseio.com/recipes.json';

  recipes: Recipe[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onCreateRecipe(recipe: RawRecipe) {
    this.http.post<{ name: string }>(this.url, recipe)
      .subscribe(res => {
        console.log(res.name);
      });
  }

  onFetchRecipes() {
    this.http.get<{ [key: string]: RawRecipe }>(this.url)
      .pipe(map(res => {
        const result: Recipe[] = []
        for (const key in res) {
          result.push({...res[key], key});
        }
        return result;
      }))
      .subscribe(res => {
        this.recipes = res;
      });
  }

  onClearRecipes() {

  }
}
