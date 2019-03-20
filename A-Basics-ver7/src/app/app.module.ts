import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {DatabindingComponent} from './databinding/databinding.component';

@NgModule({
  // root app component
  bootstrap: [AppComponent],
  // all components
  declarations: [
    AppComponent,
    DatabindingComponent,
    LifecycleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ]
})
export class AppModule {

  constructor() {
    console.log('2. AppModule.constructor');
  }
}
