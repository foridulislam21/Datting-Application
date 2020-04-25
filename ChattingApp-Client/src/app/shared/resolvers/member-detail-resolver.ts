import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'shared/Models/user';
import { UserService } from 'shared/services/user.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params.id).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
