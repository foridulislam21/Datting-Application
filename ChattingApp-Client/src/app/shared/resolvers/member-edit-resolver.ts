import { Injectable } from '@angular/core';
import { User } from 'shared/Models/user';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth/auth.service';
import { AlertifyService } from 'shared/services/spinner/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving your data!');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
