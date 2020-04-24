import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {AppState} from "../../store/app.reducer";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('recipe')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
}
