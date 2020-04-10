import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: []
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    console.log('Selecting ' + recipe.name);
    this.recipeService.getRecipeSelected().emit(recipe);
  }
}
