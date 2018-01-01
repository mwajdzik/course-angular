import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {ServersComponent} from './servers/servers.component';
import {UserComponent} from './users/user/user.component';
import {UsersService} from './users/users.service';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditUserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes) - moved to a separate file
    AppRoutingModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
