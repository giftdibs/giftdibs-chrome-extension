import {
  NgModule
} from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormFieldModule, ImageUploaderModule, WaitModule, CharacterCounterModule } from '@giftdibs/ux';
import { NoticeModule } from '@giftdibs/ux';

import {
  GiftCreateComponent
} from './gift-create.component';

import {
  GiftCreateService
} from './gift-create.service';

import { GiftCreateRoutingModule } from './gift-create-routing.module';

@NgModule({
  declarations: [
    GiftCreateComponent
  ],
  imports: [
    CharacterCounterModule,
    CommonModule,
    FormFieldModule,
    FormsModule,
    GiftCreateRoutingModule,
    ImageUploaderModule,
    NoticeModule,
    ReactiveFormsModule,
    WaitModule
  ],
  exports: [
    GiftCreateComponent
  ],
  providers: [
    GiftCreateService
  ]
})
export class GiftCreateModule { }
