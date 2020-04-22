import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'shared/services/auth/auth.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {}
  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login successFully');
      },
      (error) => {
        this.alertify.error('Wrong Information');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
