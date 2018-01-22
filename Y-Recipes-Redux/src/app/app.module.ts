import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import {DataStorageService} from './shared/data-storage.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {AuthInterceptor} from './shared/auth.interceptor';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/auth.effects';
import {reducers} from './store/app.reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),                                     // Redux store
    EffectsModule.forRoot([AuthEffects]),                              // effects - like reducers but don't change the state
    StoreRouterConnectingModule,                                       // for tracking router-state
    !environment.production ? StoreDevtoolsModule.instrument() : []    // for debugging the state
  ],
  providers: [
    AuthGuardService,
    RecipeService,
    DataStorageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
