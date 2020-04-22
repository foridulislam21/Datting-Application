import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'shared/Services/Spinner/spinner.service';
import { AlertifyService } from 'shared/Services/Spinner/alertify.service';
import { AuthService } from 'app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public spinnerService: SpinnerService,
    private alertify: AlertifyService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }
}
