import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {RecipeService} from './recipes/recipe.service';
import {DataStorageService} from './shared/data-storage.service';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    RecipeService,
    ShoppingListService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
