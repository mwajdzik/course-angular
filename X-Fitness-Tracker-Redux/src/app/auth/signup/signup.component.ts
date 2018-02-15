import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {getIsLoading, State} from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate = moment().subtract(18, 'year');
  isLoading = false;

  constructor(private authService: AuthService,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(getIsLoading).subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  ngOnDestroy() {
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
