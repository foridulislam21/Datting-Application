import { Component, OnInit, Input } from '@angular/core';
import { User } from 'shared/Models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {}
}
