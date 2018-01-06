import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {SelectorsComponent} from './selectors/selectors.component';
import {BindingComponent} from './binding/binding.component';
import {ObservablesComponent} from './observables/observables.component';
import {UsersService} from './observables/users.service';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponent,
    SelectorsComponent,
    BindingComponent,
    ObservablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('2. AppModule.constructor');
  }
}
