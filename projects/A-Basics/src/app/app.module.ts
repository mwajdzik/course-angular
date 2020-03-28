import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DataBindingComponent} from "./databinding/data-binding.component";
import {FormsModule} from "@angular/forms";
import {LoggerComponent} from './logger/logger.component';
import {LoggingService} from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
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
