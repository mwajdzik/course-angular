import {Component, OnInit} from '@angular/core';
import {RawRecipe, Recipe, RecipeService} from "./recipe.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  recipes: Recipe[] = [];
  isFetching: boolean;
  message: string;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onCreateRecipe(recipe: RawRecipe) {
    this.message = '';

    this.recipeService.postRecipe(recipe)
      .subscribe(res => {
        console.log(res.name);
      }, (err: HttpErrorResponse) => {
        this.message = err.message;
      });
  }

  onFetchRecipes() {
    this.isFetching = true;
    this.message = '';

    this.recipeService.fetchRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.isFetching = false;
      }, (err: HttpErrorResponse) => {
        this.recipes = [];
        this.message = err.message;
        this.isFetching = false;
      });
  }

  onClearRecipes() {
    this.recipeService.deleteRecipes()
      .subscribe(() => {
        this.recipes = [];
      });
  }
}
