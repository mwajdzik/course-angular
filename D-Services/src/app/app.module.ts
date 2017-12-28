import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NewAccountComponent} from './account/new-account/new-account.component';
import {AccountItemComponent} from './account/account-item/account-item.component';
import {AccountsService} from './accounts.service';
import {LoggingService} from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    NewAccountComponent,
    AccountItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AccountsService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
