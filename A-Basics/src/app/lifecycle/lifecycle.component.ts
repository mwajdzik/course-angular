import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges,
  OnDestroy, OnInit, SimpleChanges
} from "@angular/core";

@Component({
  selector: 'app-lifecycle',
  template: `
    <ng-content></ng-content>
    <div>{{value}}</div>
  `,
  styles: [`
    div {
      color: burlywood;
    }
  `]
})
export class LifecycleComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() value;

  constructor() {
    console.log('101. LifecycleComponent.constructor');
  }

  // called after a bound input property changes - called many times
  ngOnChanges(changes: SimpleChanges): void {
    console.log('102. ngOnChanges called');

    let c: any = changes;
    console.log('\tpreviousValue =', c.value.previousValue);
    console.log('\tcurrentValue =', c.value.currentValue);
  }

  // called once the component is initialized (after constructor)
  ngOnInit() {
    console.log('103. ngOnInit called');
  }

  // called during every change detection run - called many times
  ngDoCheck(): void {
    console.log('104. ngDoCheck called');
  }

  // called after content (ng-content) has been projected into view
  ngAfterContentInit(): void {
    console.log('105. ngAfterContentInit called');
  }

  // called every time the projected content has been checked
  ngAfterContentChecked(): void {
    console.log('106. ngAfterContentChecked called');
  }

  // called after the component's view (and child views) has been initialized
  ngAfterViewInit(): void {
    console.log('107. ngAfterViewInit called');
  }

  // called after the view (and child views) has been checked
  ngAfterViewChecked(): void {
    console.log('108. ngAfterViewChecked called');
  }

  // called once the component is about to be destroyed
  ngOnDestroy(): void {
    console.log('109. ngOnDestroy called');
  }
}
