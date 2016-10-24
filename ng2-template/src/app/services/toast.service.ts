import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Toast } from './';


@Injectable()
export class ToastService {
  private toasts: Toast[] = [];
  private toastsSubject = new Subject<Toast[]>();
  public toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  public add (newToast: Toast) {
    this.toasts.push(newToast);
    this.toastsSubject.next(this.toasts);
    if (newToast.autoRemove) {
      setTimeout(this.remove.bind(this, newToast.id), (newToast.toastLife || 3000));
    }
  }

  public remove (id: number, index?: number) {
    let spliceIndex = index || this.toasts.findIndex(t => t.id === id);
    this.toasts.splice(spliceIndex, 1);
  }

  public success (text: string, options?: Toast) {
    this.addToast('success', (text || (options && options.text) || ''), options);
  }
  public error (text: string, options?: Toast) {
    this.addToast('error', (text || (options && options.text) || ''), options);
  }
  public warning (text: string, options?: Toast) {
    this.addToast('warning', (text || (options && options.text) || ''), options);
  }
  public info (text: string, options?: Toast) {
    this.addToast('info', (text || (options && options.text) || ''), options);
  }
  private addToast (type: string, text: string, options?: Toast) {
    this.add(Object.assign(new Toast(), options, {text, type}));
  }
}
