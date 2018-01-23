import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ShoppingListFeatureState, ShoppingListState} from './store/shopping-list.reducers';
import {StartEditIngredient} from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState: Observable<ShoppingListState>;

  constructor(private store: Store<ShoppingListFeatureState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEditIngredient(index));
  }
}
