import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {SignUpStart} from "../store/auth.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [``]
})
export class SignupComponent {

  public isLoading = false;
  public error = null;
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new SignUpStart({email, password}));
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
