import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { SpinnerService } from 'shared/services/spinner/spinner.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorInterceptor } from './error.interceptor';

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        },
        (error) => {
          this.spinnerService.hide();
        }
      )
    );
  }
}
export const SpinnerHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SpinnerHttpInterceptor,
  multi: true,
};
