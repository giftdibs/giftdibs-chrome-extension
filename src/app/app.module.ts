import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  SessionModule
} from '@giftdibs/session';

import {
  environment
} from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/modules/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HeaderModule,
    SessionModule.forRoot(environment.apiUrl)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
