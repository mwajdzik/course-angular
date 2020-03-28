import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {RecipeFeatureState, RecipeState} from '../store/recipe.reducers';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  public recipeState: Observable<RecipeState>;

  constructor(private store: Store<RecipeFeatureState>) {
  }

  ngOnInit(): void {
    this.recipeState = this.store.select('recipe');
  }
}
