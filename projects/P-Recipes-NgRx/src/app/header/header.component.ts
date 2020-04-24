import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {LogOut} from "../auth/store/auth.actions";
import {FetchRecipes, StoreRecipes} from "../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated = false;
  private userSubs: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.user;
    });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new LogOut())
  }
}
