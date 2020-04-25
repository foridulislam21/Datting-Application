import { Component, OnInit, Input } from '@angular/core';
import { User } from 'shared/Models/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {}
}
