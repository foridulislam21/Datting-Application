import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AlertifyService } from 'shared/Services/Spinner/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  model: any = {};
  registerSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {}
  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration Successful');
      },
      (error) => {
        this.alertify.warning(error);
      }
    );
  }
  cancel() {
    console.log('Cancelled');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
