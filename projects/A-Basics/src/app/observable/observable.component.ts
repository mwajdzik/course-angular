import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-observable',
  template: `
    <div class="col-xs-12">
      <div class="row">
        Interval: {{counter}}
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class ObservableComponent implements OnInit, OnDestroy {

  counter = 0;
  private intervalSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.intervalSubscription = interval(1000).subscribe(count => {
      this.counter = count;
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
