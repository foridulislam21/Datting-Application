import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  model: any = {};
  loginSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
  login() {
    this.loginSubscription = this.authService.login(this.model).subscribe(next => {
      console.log('Login in successfully');
    }, error => {
      console.log(error);
    });
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
