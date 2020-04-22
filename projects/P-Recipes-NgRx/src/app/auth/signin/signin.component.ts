import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {LogInStart} from "../store/auth.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [``]
})
export class SigninComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public error = null;
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new LogInStart({email, password}));
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
