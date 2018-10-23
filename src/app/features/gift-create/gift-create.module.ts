import {
  NgModule
} from '@angular/core';

import {
  GiftCreateComponent
} from './gift-create.component';

import {
  GiftCreateService
} from './gift-create.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftCreateRoutingModule } from './gift-create-routing.module';

@NgModule({
  declarations: [
    GiftCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GiftCreateRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    GiftCreateComponent
  ],
  providers: [
    GiftCreateService
  ]
})
export class GiftCreateModule { }
