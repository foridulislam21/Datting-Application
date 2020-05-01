import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { User } from 'shared/Models/user';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { UserService } from 'shared/services/user.service';
import { Pagination, PaginatedResult } from 'shared/Models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];
  userPrams: any = {};
  pagination: Pagination;
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private loader: SlimLoadingBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.userPrams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userPrams.minAge = 18;
    this.userPrams.maxAge = 99;
    this.userPrams.orderBy = 'lastActive';
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  resetFilters() {
    this.userPrams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userPrams.minAge = 18;
    this.userPrams.maxAge = 99;
    this.loadUsers();
  }
  loadUsers() {
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userPrams
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
