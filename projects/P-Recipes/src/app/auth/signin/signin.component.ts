import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [``]
})
export class SigninComponent {

  public isLoading = false;
  public error = null;

  constructor(private authService: AuthService,
              private route: Router) {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.signInUser(email, password).subscribe(res => {
      this.isLoading = false;
      this.route.navigate(['/']);
    }, error => {
      this.isLoading = false;
      this.error = error;
    });
  }
}
