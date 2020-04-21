import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  model: any = {};
  registerSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.registerSubscription.unsubscribe();
  }
  register() {
    this.registerSubscription = this.authService.register(this.model).subscribe(() => {
      console.log('Registration Successful');
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    console.log('Cancelled');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
