import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You need to register');
    this.router.navigate(['/home']);
    return false;
  }
}
