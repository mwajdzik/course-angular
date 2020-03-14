import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @Output() editingDone = new EventEmitter<void>();
  @ViewChild('f') formRef: NgForm;
  private subscription: Subscription;
  private index: number;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) {
  }

  addIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.index, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.resetForm();
  }

  resetForm() {
    this.index = undefined;
    this.editMode = false;
    this.formRef.resetForm();
    this.editingDone.emit();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.getIngredientsEdited()
      .subscribe((index) => {
        const ingredient = this.shoppingListService.getIngredient(index);
        this.editMode = true;
        this.index = index;

        this.formRef.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.index);
    this.resetForm();
  }
}
