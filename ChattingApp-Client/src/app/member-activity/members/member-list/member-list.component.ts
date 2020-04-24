import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { User } from 'shared/Models/user';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  users: User[];
  userSubscription: Subscription;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private loader: SlimLoadingBarService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  loadUsers() {
    this.loader.start();
    this.userSubscription = this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.loader.complete();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
