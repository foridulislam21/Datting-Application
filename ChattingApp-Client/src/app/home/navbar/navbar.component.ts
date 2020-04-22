import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { SpinnerService } from 'shared/services/spinner/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public spinnerService: SpinnerService,
    private alertify: AlertifyService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
