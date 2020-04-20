import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  model: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  register() {
    console.log(this.model);
  }
  cancel() {
    console.log('Cancelled');
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
