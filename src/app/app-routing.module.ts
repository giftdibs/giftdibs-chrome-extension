import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: './features/login/login.module#LoginModule'
  },
  {
    path: 'create',
    loadChildren: './features/gift-create/gift-create.module#GiftCreateModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: './features/home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
