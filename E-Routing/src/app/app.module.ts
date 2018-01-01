import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {ServersComponent} from './servers/servers.component';
import {UserComponent} from './users/user/user.component';
import {UsersService} from './users/users.service';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'servers', component: ServersComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id', component: UserComponent},
      {path: ':id/edit', component: EditUserComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
