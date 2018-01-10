import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-data-driven',
  templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent implements OnInit {

  myForm: FormGroup;

  gender = [
    'female',
    'male'
  ];

  constructor() {
  }

  static emailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && !control.value.match(/[\w]+@[\w]+\.[\w]{2,3}/)) {
      return {invalid: true};
    }

    return null;
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl('Maciek', Validators.required),
        email: new FormControl('', [
          Validators.required,
          DataDrivenComponent.emailValidator,
          Validators.pattern(/[\w]+@[\w]+\.[\w]{2,3}/)
        ]),
      }),
      password: new FormControl('', Validators.required),
      gender: new FormControl('male'),
      hobbies: new FormArray([
        new FormControl('Cooking', Validators.required, this.asyncValidator)
      ])
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );
    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onSubmit() {
    console.log('DATA-DRIVEN');
    console.log(this.myForm.value);
    console.log(this.myForm);
  }

  addHobby() {
    (<FormArray>this.myForm.controls['hobbies'])
      .push(new FormControl('', Validators.required, this.asyncValidator));
  }

  asyncValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({invalid: true});
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
  }
}
