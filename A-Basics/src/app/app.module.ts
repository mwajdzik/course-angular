import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {SelectorsComponent} from './selectors/selectors.component';
import {BindingComponent} from './binding/binding.component';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponent,
    SelectorsComponent,
    BindingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('2. AppModule.constructor');
  }
}
