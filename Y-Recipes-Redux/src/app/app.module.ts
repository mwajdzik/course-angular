import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RecipeService} from './recipes/recipe.service';
import {DataStorageService} from './shared/data-storage.service';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';

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
    StoreModule.forRoot(reducers)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    RecipeService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
