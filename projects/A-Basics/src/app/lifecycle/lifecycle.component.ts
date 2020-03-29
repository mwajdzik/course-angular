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
    <div>
      <div class="row">
        <ng-content>
        </ng-content>
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

    .control-label {
      width: 100%;
      margin-top: 1em;
    }

    textarea {
      height: 250px;
      font-family: Courier, serif;
    }
  `]
})
export class LifecycleComponent implements OnChanges, OnInit, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() value: string;
  @ContentChild('ngContentRef') ngContentRef: ElementRef;

  constructor(private loggingService: LoggingService) {
    this.logMessage('5. lifecycle.component.ts - LifecycleComponent.constructor');
    this.logMessage('101. LifecycleComponent.constructor');
  }

  logMessage(message) {
    this.loggingService.info(message);
  }

  // called after a bound input property changes - called many times
  ngOnChanges(changes: SimpleChanges): void {
    this.logMessage('102. ngOnChanges called');
    this.logMessage('     previousValue = ' + changes.value.previousValue);
    this.logMessage('     currentValue = ' + changes.value.currentValue);
  }

  // called once the component is initialized (after constructor)
  ngOnInit() {
    this.logMessage('103. ngOnInit called');
  }

  // called after content (ng-content) has been projected into view
  ngAfterContentInit(): void {
    this.logMessage('105. ngAfterContentInit called');
  }

  // called every time the projected content has been checked
  ngAfterContentChecked(): void {
    this.logMessage('106. ngAfterContentChecked called');
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
    this.logMessage('109. ngOnDestroy called');
  }
}
