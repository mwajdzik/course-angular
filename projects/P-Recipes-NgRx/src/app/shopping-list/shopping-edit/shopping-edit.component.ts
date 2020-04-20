import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AddIngredient, DeleteIngredient, StopEditIngredient, UpdateIngredient} from "../store/shopping-list.actions";
import {AppState} from "../store/shopping-list.reducer";

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

  public editMode = false;
  public editedItem: Ingredient;

  @ViewChild('f') form: NgForm;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(state => {
      this.editMode = state.editedIngredientIndex !== -1;

      if (this.editMode) {
        this.editedItem = state.editedIngredient;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEditIngredient())
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }

    this.onFormReset();
  }

  onFormReset() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(new StopEditIngredient())
  }

  onDelete() {
    this.onFormReset();
    this.store.dispatch(new DeleteIngredient())
  }
}
