import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map, skip} from "rxjs/operators";

@Component({
  selector: 'app-observable',
  template: `
    <div class="col-xs-12">
      <div class="row">
        <div>rxjs Interval: {{counter}}</div>
        <div>Custom Interval: {{customCounter}}</div>
        <div>{{message}}</div>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class ObservableComponent implements OnInit, OnDestroy {

  counter = 0;
  customCounter = 0;
  message = '';

  private intervalSubscription: Subscription;
  private customIntervalSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.intervalSubscription = interval(1000).subscribe(count => {
      this.counter = count;
    });

    let customInterval = Observable.create((observer) => {
      let count = 0;

      setInterval(() => {
        observer.next(count);

        if (count == 10) {
          observer.complete();
        }

        if (count > 15) {
          observer.next(count);
          observer.error(new Error('Count is greater than 5!'));
        }

        count++;
      }, 1000);
    });

    customInterval = customInterval.pipe(
      skip(5),
      filter((data: number) => (data % 2) == 0),
      map((data: number) => 'iteration #' + data)
    );

    this.customIntervalSubscription = customInterval.subscribe(count => {
      this.customCounter = count;
    }, (error) => {
      this.message = 'Error: ' + error.message;
    }, () => {
      this.message = 'Completed!';
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
    this.customIntervalSubscription.unsubscribe();
  }
}
