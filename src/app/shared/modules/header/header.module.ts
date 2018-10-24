import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  ThumbnailModule
} from '@giftdibs/ux';

import {
  HeaderComponent
} from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ThumbnailModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
