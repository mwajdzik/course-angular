import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {map, switchMap} from "rxjs/operators";
import {DeleteRecipe} from "../store/recipe.actions";
import {AddIngredients} from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit {

  public recipe: Recipe;
  public id: number;

  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(param => +param['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }),
      map(
        recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return this.id === index;
          })
        }
      )
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
