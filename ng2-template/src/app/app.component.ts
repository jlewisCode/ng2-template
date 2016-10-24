import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationError, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from './services';


@Component({
  selector: 'app-comp',
  template: `
    <toast></toast>
    <!--<app-header class="header">-->
      <nav>
        <a *ngIf="!loggedIn" [routerLink]="['login']">login</a>
        <a *ngIf="loggedIn" (click)="logout()">logout</a>
      </nav>
    <!--</app-header>-->
    <router-outlet></router-outlet>
    <!--<app-footer class="footer"></app-footer>-->
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../scss/defaults.scss',
    '../scss/typography.scss',
    '../scss/globals.scss',
  ],
})

export class AppComponent implements OnInit, OnDestroy {
  private routerSub: any;
  private dataSub: any;
  private userSub: any;
  private navBgActive: boolean = false;
  private loggedIn: boolean = false;

  constructor(
    private router: Router,
    private title: Title,
    private auth: AuthService
  ) {}

  public ngOnInit () {
    let router$ = this.router.events;
    let routerSub = router$
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
          // strategy for scroll to top on route change
          window.scrollTo(0, 0);
          // strategy for changing the browser tab/window title on route change
          this.dataSub = this.router.routerState.root.firstChild.data.subscribe((data: any) => {
            let titleStr = data.title || this.router.routerState.root.firstChild.routeConfig.path;
            this.setTitle(titleStr);
          });
      });

    this.userSub = this.auth.user$.subscribe((user: any) => {
      this.loggedIn = !!(user.id);
    });
  }

  public ngOnDestroy () {
    this.routerSub.unsubscribe();
    this.dataSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  private setTitle (moreTitle: string) {
    let title = 'PROJECT_NAME';
    if (moreTitle) {
      title += ` | ${moreTitle}`;
    }
    this.title.setTitle(title);
  }

  private logout () {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
