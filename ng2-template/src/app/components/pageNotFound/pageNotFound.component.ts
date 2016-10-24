import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';


@Component({
  selector: 'page-not-found-route',
  templateUrl: 'pageNotFound.component.html',
  styleUrls: [ './pageNotFound.component.scss' ],
})

export class PageNotFoundRoute implements OnInit, OnDestroy {
  private interval: any;
  private remainingSeconds: number = 5;

  public constructor (
    private router: Router,
    private auth: AuthService
  ) {}

  public ngOnInit () {
    this.countdown();
  }

  public ngOnDestroy () {
    clearInterval(this.interval);
  }

  private countdown () {
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        clearInterval(this.interval);
        this.redirect();
      }
    }, 1000);
  }

  private redirect () {
    this.router.navigate(['/']);
  }
}
