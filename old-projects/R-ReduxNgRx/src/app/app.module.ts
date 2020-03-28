import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {appReducer, UiState} from './app.reducer';

export interface StoreState {
  ui: UiState;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
