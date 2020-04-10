import {EventEmitter, Injectable, Output} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  @Output() private ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  public getIngredients() {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  public getIngredientsChange() {
    return this.ingredientsChanged;
  }
}
