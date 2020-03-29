import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DataBindingComponent} from "./databinding/data-binding.component";
import {FormsModule} from "@angular/forms";
import {LoggerComponent} from './logger/logger.component';
import {LoggingService} from "./logging.service";
import {DataService} from "./data.service";
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {HighlightDirective} from "./directive/highlight.directive";
import {UnlessDirective} from "./directive/unless.directive";
import {RefsComponent} from "./refs/refs.component";

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    LifecycleComponent,
    LoggerComponent,
    HighlightDirective,
    UnlessDirective,
    RefsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    DataService,
    LoggingService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor(private loggingService: LoggingService) {
    loggingService.info('2. app.module.ts - AppModule.constructor');
  }
}
