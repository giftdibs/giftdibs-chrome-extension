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

@NgModule({
  declarations: [
    GiftCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
