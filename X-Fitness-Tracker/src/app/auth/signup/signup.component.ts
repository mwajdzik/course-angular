import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {AuthService} from '../auth.service';
import {UIService} from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate = moment().subtract(18, 'year');
  isLoading = false;

  private loadingSubscription;

  constructor(private authService: AuthService,
              private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged
      .subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
