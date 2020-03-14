import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {DataBindingComponent} from './databinding/data-binding.component';
import {HighlightDirective} from './directive/highlight.directive';
import {UnlessDirective} from './directive/unless.directive';
import {CockpitComponent} from './cockpit/cockpit.component';

@NgModule({
  // root app component
  bootstrap: [AppComponent],
  // all components
  declarations: [
    AppComponent,
    CockpitComponent,
    DataBindingComponent,
    LifecycleComponent,
    UnlessDirective,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: []
})
export class AppModule {

  constructor() {
    console.log('2. AppModule.constructor');
  }
}
