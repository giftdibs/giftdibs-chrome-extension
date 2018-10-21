import {
  NgModule
} from '@angular/core';

import {
  LoginComponent
} from './login.component';

import { LoginService } from './login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
