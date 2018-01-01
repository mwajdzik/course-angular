import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {ServersComponent} from './servers/servers.component';
import {UsersComponent} from './users/users.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserComponent} from './users/user/user.component';
import {AuthGuardService} from './auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'servers', component: ServersComponent, canActivate: [AuthGuardService]},
  {
    path: 'users', component: UsersComponent, canActivateChild: [AuthGuardService], children: [
      {path: ':id', component: UserComponent},
      {path: ':id/edit', component: EditUserComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
