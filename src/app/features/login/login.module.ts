import {
  NgModule
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  FormFieldModule
} from '@giftdibs/ux';

import {
  LoginComponent
} from './login.component';

import {
  LoginService
} from './login.service';

import {
  LoginRoutingModule
} from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
