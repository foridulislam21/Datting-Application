import { Component, Input, OnInit } from '@angular/core';
import { User } from 'shared/Models/user';
import { AuthService } from 'shared/services/auth/auth.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}
  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this.alertify.success('You have liked:' + this.user.knownAs);
        },
        // tslint:disable-next-line: no-shadowed-variable
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
