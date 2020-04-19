import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [``]
})
export class SignupComponent {

  public isLoading = false;
  public error = null;

  constructor(private authService: AuthService,
              private route: Router) {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.signUpUser(email, password).subscribe(res => {
      this.isLoading = false;
      this.route.navigate(['/auth', 'signin']);
    }, error => {
      this.isLoading = false;
      this.error = error;
    });
  }
}
