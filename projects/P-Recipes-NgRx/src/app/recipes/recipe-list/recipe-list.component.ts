import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()

    this.subscription = this.recipeService.getRecipesChanged().subscribe((recipes: Recipe[]) => {
      this.recipes = this.recipeService.getRecipes()
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
