import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    console.log('Adding a new ingredient');

    this.shoppingListService.addIngredient(new Ingredient(
      this.nameInputRef.nativeElement.value,
      +this.amountInputRef.nativeElement.value
    ))
  }
}
