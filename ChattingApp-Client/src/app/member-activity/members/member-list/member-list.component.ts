import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { User } from 'shared/Models/user';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private loader: SlimLoadingBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.users;
    });
  }
  // loadUsers() {
  //   this.loader.start();
  //   this.userSubscription = this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //       this.loader.complete();
  //     },
  //     (error) => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
