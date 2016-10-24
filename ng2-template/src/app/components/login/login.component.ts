import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.scss' ],
  providers: [],
})

export class LoginRoute implements OnDestroy {
  private username: string = '';
  private password: string = '';
  private error: any = '';
  private authSub: any = {};
  private resetSub: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  public login() {
    this.error = '';
    this.authSub = this.auth.login(this.username, this.password)
      .subscribe(
        () => this.router.navigate(['/']),
        () => this.error = 'Incorrect credentials. Please try again.'
      );
  }

  public resetPassword() {
    this.resetSub = this.auth.resetPassword(this.username)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public ngOnDestroy () {
    if (this.authSub && this.authSub.unsubscribe) {
      this.authSub.unsubscribe();
    }
    if (this.resetSub && this.resetSub.unsubscribe) {
      this.resetSub.unsubscribe();
    }
  }
}
