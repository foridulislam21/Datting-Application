import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MemberDetailResolver } from 'shared/resolvers/member-detail-resolver';
import { MemberListResolver } from 'shared/resolvers/member-list-resolver';
import { AuthService } from 'shared/services/auth/auth.service';
import { SharedModule } from 'shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    HomeModule,
    SharedModule,
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [AuthService, MemberDetailResolver, MemberListResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
