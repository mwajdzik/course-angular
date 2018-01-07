import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';

import {UsersService} from './users.service';

@Component({
  selector: 'app-observables',
  template: `
    <div>
      <button class="btn btn-primary" (click)="onActivate()">Activate</button>
    </div>
  `,
  styles: []
})
export class ObservablesComponent implements OnInit, OnDestroy {
  private numbersObservable;
  private myObservable;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.createNumbersObservable();
    this.createMyObservable();

    this.userService.userActivated.subscribe(
      (id: number) => {
        console.log('user ' + id + ' activated');
      }
    );
  }

  ngOnDestroy() {
    this.myObservable.unsubscribe();
    this.numbersObservable.unsubscribe();
  }

  private createNumbersObservable() {
    this.numbersObservable = Observable.interval(1000)
      .map((number: number) => {
        return number * 2;
      });

    this.numbersObservable.subscribe(
      (number: number) => {
        console.log(number);
      },
      () => {
        console.log('Error!');
      },
      () => {
        console.log('Complete!');
      }
    );
  }

  private createMyObservable() {
    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package');
        }, 2000);

        setTimeout(() => {
          observer.next('second package');
        }, 4000);

        setTimeout(() => {
          observer.complete();
        }, 4500);

        setTimeout(() => {
          observer.error('this does not work');
        }, 5000);
      }
    );

    myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      () => {
        console.log('error');
      },
      () => {
        console.log('completed');
      }
    );
  }

  onActivate() {
    this.userService.userActivated.next(23);
  }
}