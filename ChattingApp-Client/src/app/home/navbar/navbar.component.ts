import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'shared/Services/Spinner/spinner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showSpinner: boolean;
  constructor(public spinnerService: SpinnerService) {}

  ngOnInit(): void {}
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
