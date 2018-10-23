import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
