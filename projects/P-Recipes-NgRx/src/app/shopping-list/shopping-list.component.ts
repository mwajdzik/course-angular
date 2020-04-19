import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[];
  private ingredientsChangeSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsChangeSubs = this.shoppingListService.getIngredientsChange().subscribe(ingredients => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.ingredientsChangeSubs.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.getStartedEditing().next(index);
  }
}
