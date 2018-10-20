import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  GiftCreateModule
} from './gift-create';

import {
  LoginModule
} from './login';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    GiftCreateModule,
    LoginModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
