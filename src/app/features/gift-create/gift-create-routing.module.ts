import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  GiftCreateComponent
} from './gift-create.component';

const routes: Routes = [
  {
    path: '',
    component: GiftCreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GiftCreateRoutingModule { }
