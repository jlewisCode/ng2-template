import { Component, OnInit } from '@angular/core';
import { AuthService, ToastService } from '../../services';

@Component({
  selector: 'home-route',
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ],
})

export class HomeRoute implements OnInit {
  private user: {} = undefined;

  public constructor (
    private auth: AuthService,
    private toast: ToastService
  ) {}

  public ngOnInit () {
    this.auth.user$.subscribe(user => this.user = user);
    this.toast.info('hello toast!');
  }
}
