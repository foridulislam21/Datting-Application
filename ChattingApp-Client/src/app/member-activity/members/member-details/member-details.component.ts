import { Component, OnInit } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { User } from 'shared/Models/user';
import { ActivatedRoute } from '@angular/router';

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
    this.loadUser();
  }
  loadUser() {
    this.userService.getUser(+this.route.snapshot.params.id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
