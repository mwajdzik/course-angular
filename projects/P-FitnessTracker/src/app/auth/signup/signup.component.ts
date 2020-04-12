import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate = moment().subtract(18, 'year');
  isLoading = false;

  private loadingSubscription;

  // constructor(private authService: AuthService,
  //             private uiService: UIService) {
  // }

  ngOnInit() {
    // this.loadingSubscription = this.uiService.loadingStateChanged
    //   .subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    // this.authService.registerUser({
    //   email: form.value.email,
    //   password: form.value.password
    // });
  }
}
