import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent
  ]
})
export class HomeModule { }
