import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  private selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getSelectedRecipeEmitter().subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
