import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChattingApp-Client';
  constructor(private loader: SlimLoadingBarService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loader.start();
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loader.complete();
      }, 2000);
    }
    if (event instanceof NavigationCancel) {
      this.loader.stop();
    }
    if (event instanceof NavigationError) {
      this.loader.stop();
    }
  }
}
