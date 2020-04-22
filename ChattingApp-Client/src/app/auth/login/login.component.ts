import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AlertifyService } from 'shared/Services/Spinner/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit(): void {}
  ngOnDestroy() {
  }
  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login successFully');
      },
      (error) => {
        this.alertify.error('Wrong Information');
      }
    );
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
