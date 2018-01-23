import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {AddIngredient, DeleteIngredient, StopEditIngredient, UpdateIngredient} from '../store/shopping-list.actions';
import {ShoppingListFeatureState} from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') formRef: NgForm;
  private subscription: Subscription;
  public editMode = false;

  constructor(private store: Store<ShoppingListFeatureState>) {
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }

    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.formRef.resetForm();
    this.store.dispatch(new StopEditIngredient());
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((data) => {
      if (data.editedIngredientIndex > -1) {
        this.editMode = true;

        this.formRef.setValue({
          name: data.editedIngredient.name,
          amount: data.editedIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEditIngredient());
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.resetForm();
    this.store.dispatch(new DeleteIngredient());
  }
}
