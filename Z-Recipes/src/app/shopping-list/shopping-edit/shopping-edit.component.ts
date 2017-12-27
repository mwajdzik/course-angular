import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @Output('ingredientAdded') ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('nameInput') nameRef: ElementRef;
  @ViewChild('amountInput') amountRef: ElementRef;

  addIngredient() {
    this.ingredientAdded.emit(new Ingredient(this.nameRef.nativeElement.value, this.amountRef.nativeElement.value));
  }
}
