import {Component, OnInit} from '@angular/core';
import {RawRecipe, Recipe, RecipeService} from "./recipe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  recipes: Recipe[] = [];
  isFetching: boolean;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onCreateRecipe(recipe: RawRecipe) {
    this.recipeService.postRecipe(recipe)
      .subscribe(res => {
        console.log(res.name);
      });
  }

  onFetchRecipes() {
    this.isFetching = true;

    this.recipeService.fetchRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
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
