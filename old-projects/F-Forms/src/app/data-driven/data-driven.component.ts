import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-data-driven',
  templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent implements OnInit {

  myForm: FormGroup;
  gender = ['female', 'male'];
  private forbiddenEmail = 'amw061@gmail.com';

  constructor() {
  }

  static myEmailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && !control.value.match(/[\w]+@[\w]+\.[\w]{2,3}/)) {
      return {invalid: true};
    }

    return null;  // valid
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          DataDrivenComponent.myEmailValidator,
          Validators.pattern(/[\w]+@[\w]+\.[\w]{2,3}/)
        ], [
          this.forbiddenEmailsValidator.bind(this)
        ]),
      }),
      password: new FormControl('', Validators.required),
      gender: new FormControl(null),
      hobbies: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required)
      ])
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.myForm.get('gender').valueChanges.subscribe(
      (data: any) => console.log('Gender changed', data)
    );

    this.myForm.setValue({
      userData: {
        name: 'Maciek',
        email: 'amw061@gmail.com'
      },
      password: '123',
      gender: 'male',
      hobbies: ['Coding', 'Running']
    });
  }

  onSuggest() {
    this.myForm.patchValue({
      userData: {
        name: 'SuperUser'
      }
    });
  }

  onSubmit() {
    console.log('DATA-DRIVEN');
    console.log(this.myForm.value);
    console.log(this.myForm);
  }

  onReset() {
    this.myForm.reset({
      gender: 'female'
    });
  }

  addHobby() {
    (<FormArray>this.myForm.get('hobbies'))
      .push(new FormControl('', Validators.required));
  }

  forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === this.forbiddenEmail) {
            resolve({invalid: true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
  }
}
