import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Pork', 'A tasty one', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Chicken', 'A tasty one', 'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/3:2/w_1280,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
