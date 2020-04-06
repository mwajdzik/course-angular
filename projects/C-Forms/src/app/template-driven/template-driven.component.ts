import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
    .form-control.ng-invalid.ng-touched {
      border: 1px red solid;
    }
  `]
})
export class TemplateDrivenComponent {

  @ViewChild('f') ngForm: NgForm;
  formModel: string;

  user = {
    name: 'Maciek',
    email: 'amw061@gmail.com',
    gender: 'male',
    password: '123',
    secret: 'pet',
    answer: 'Koala'
  };

  gender = [
    'female',
    'male'
  ];

  onSubmit(form: NgForm) {
    console.log('TEMPLATE-DRIVEN');
    console.log(form.value, this.ngForm.value);
    console.log(form, this.ngForm);
  }

  onSuggest() {
    this.ngForm.form.patchValue({
      userData: {
        username: 'SuperUser'
      }
    });

    // or
    this.user.name = 'SuperUser';
  }

  ngAfterContentChecked(): void {
    if (this.ngForm) {
      this.formModel = JSON.stringify(this.ngForm.value, null, 4);
    }
  }

  getBackgroundColor() {
    if (this.ngForm) {
      return this.ngForm.valid ? 'darkseagreen' : 'indianred';
    }

    return 'darkseagreen';
  }
}
