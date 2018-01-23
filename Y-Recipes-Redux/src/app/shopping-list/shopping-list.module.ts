import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ShoppingListRoutingModule} from './shopping-list-routing.module';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {shoppingListReducer} from './store/shopping-list.reducers';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ShoppingListRoutingModule,
    StoreModule.forFeature('shoppingList', shoppingListReducer)   // because of lazy loading
  ]
})
export class ShoppingListModule {
}
