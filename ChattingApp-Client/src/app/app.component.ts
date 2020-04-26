import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AuthService } from 'shared/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SpinnerService } from 'shared/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private jwtHelper = new JwtHelperService();
  constructor(
    private loader: SlimLoadingBarService,
    private router: Router,
    private authService: AuthService,
    public spinnerService: SpinnerService,
    private render: Renderer2
  ) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  ngAfterViewInit() {
    const loader = this.render.selectRootElement('#loader');
    loader.style.display = 'none';
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
