import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'shared/Models/user';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }
}
