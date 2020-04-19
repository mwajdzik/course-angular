import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [`
    .btn {
      margin-right: 0.5em;
    }
  `]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public editMode = false;
  public editedItemIndex: number;
  public editedItem: Ingredient;

  @ViewChild('f') form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.getStartedEditing().subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onFormReset();
  }

  onFormReset() {
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.onFormReset();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
