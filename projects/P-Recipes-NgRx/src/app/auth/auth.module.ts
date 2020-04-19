import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
