import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Login in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
