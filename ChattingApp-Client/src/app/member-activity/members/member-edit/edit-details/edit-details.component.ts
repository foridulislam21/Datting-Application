import { Component, OnInit, Input } from '@angular/core';
import { User } from 'shared/Models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css'],
})
export class EditDetailsComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {}
}
