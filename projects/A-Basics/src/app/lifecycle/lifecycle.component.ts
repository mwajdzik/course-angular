import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-lifecycle',
  template: `
    <div class="col-xs-12">
      <div class="row">
        <ng-content></ng-content>
      </div>
      <div class="row" *ngIf="value">
        The latest added: {{value}}
      </div>
    </div>
  `,
  styles: [`
    .row {
      padding: 0 1em;
    }
  `]
})
export class LifecycleComponent implements OnChanges, OnInit, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() value: string;
  @ContentChild('ngContentRef') ngContentRef: ElementRef;

  constructor(private loggingService: LoggingService) {
    this.logMessage('lifecycle.component.ts - LifecycleComponent.constructor');
  }

  logMessage(message) {
    this.loggingService.info(message);
  }

  // called after a bound input property changes - called many times
  ngOnChanges(changes: SimpleChanges): void {
    this.logMessage('ngOnChanges called');
    this.logMessage('     previousValue = ' + changes.value.previousValue);
    this.logMessage('     currentValue = ' + changes.value.currentValue);
  }

  // called once the component is initialized (after constructor)
  ngOnInit() {
    this.logMessage('ngOnInit called');
  }

  // called after content (ng-content) has been projected into view
  ngAfterContentInit(): void {
    this.logMessage('ngAfterContentInit called');
  }

  // called every time the projected content has been checked
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  // called after the component's view (and child views) has been initialized
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  // called after the view (and child views) has been checked
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  // called once the component is about to be destroyed
  ngOnDestroy(): void {
    this.logMessage('ngOnDestroy called');
  }
}
