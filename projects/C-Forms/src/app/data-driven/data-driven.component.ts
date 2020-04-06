import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-data-driven',
  templateUrl: 'data-driven.component.html',
  styles: [`
    .form-control.ng-invalid.ng-touched {
      border: 1px red solid;
    }


    .form-control.ng-pending.ng-touched {
      border: 1px limegreen solid;
    }
  `]
})
export class DataDrivenComponent implements OnInit {

  public myForm: FormGroup;
  public gender = ['female', 'male'];
  private forbiddenNames = ['Kuba', 'Ewa'];
  private forbiddenEmail = 'amw061@gmail.com';

  constructor() {
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesValidator.bind(this)
        ]),
        email: new FormControl(null, [
          Validators.required,
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

    // Listeners:

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.myForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );

    this.myForm.get('gender').valueChanges.subscribe(
      (data: any) => console.log('Gender changed', data)
    );

    // Initial values
    
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

  getHobbiesControls() {
    return (<FormArray>this.myForm.get('hobbies')).controls;
  }

  static myEmailValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && !control.value.match(/[\w]+@[\w]+\.[\w]{2,3}/)) {
      return {invalid: true};
    }

    return null;  // valid
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          console.log('boom');
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
