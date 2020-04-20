import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValueComponent } from './value/value.component';


const routes: Routes = [
  { path: '', component: ValueComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
