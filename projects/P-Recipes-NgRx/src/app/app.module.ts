import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {HomeComponent} from './home/home.component';
import {SharedModule} from "./shared/shared.module";
import {StoreModule} from '@ngrx/store';
import {appReducer} from "./store/app.reducer";
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    // NgRx
    StoreModule.forRoot(appReducer, {}),
    EffectsModule.forRoot([]),
    // App Modules
    SharedModule,
    // App Routing
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
