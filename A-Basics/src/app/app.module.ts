import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LifecycleComponent} from './lifecycle/lifecycle.component';
import {SelectorsComponent} from './selectors/selectors.component';
import {BindingComponent} from './binding/binding.component';
import {ObservablesComponent} from './observables/observables.component';
import {UsersService} from './observables/users.service';
import {HttpComponent} from './http/http.component';
import {HttpClientComponent} from './http/http-client.component';
import {AuthInterceptor} from './http/auth.interceptor';
import {LoggingInterceptor} from './http/logging.interceptor';
import { PipesComponent } from './pipes/pipes.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LifecycleComponent,
    SelectorsComponent,
    BindingComponent,
    ObservablesComponent,
    HttpComponent,
    HttpClientComponent,
    PipesComponent,
    ShortenPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsersService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('2. AppModule.constructor');
  }
}
