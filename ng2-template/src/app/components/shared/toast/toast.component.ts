import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastService, Toast as ToastInterface } from '../../../services';


@Component({
  selector: 'toast',
  template: `
    <ul class="toasts">
      <li class="toast toast--{{toast.type}}" *ngFor="let toast of toasts | async; let i = index"
      [@appear] (click)="close(toast.id, i)">
        <div class="toast__text">{{toast.text}}</div>
        <div class="toast__close" *ngIf="toast.closeButton">&times;</div>
      </li>
    </ul>
  `,
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('appear', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition('void <=> *', [
        animate(200)
      ]),
    ])
  ],
})

export class Toast implements OnInit {
  private toasts: Observable<Array<ToastInterface>>;

  constructor (private toast: ToastService) {}

  public ngOnInit () {
    this.toasts = this.toast.toasts$;
  }

  private close (id: number, index?: number) {
    this.toast.remove(id, index);
  }
}
