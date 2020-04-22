import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AuthService } from './auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private jwtHelper = new JwtHelperService();
  constructor(
    private loader: SlimLoadingBarService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loader.start();
    }
    if (event instanceof NavigationEnd) {
      this.loader.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loader.stop();
    }
    if (event instanceof NavigationError) {
      this.loader.stop();
    }
  }
}
