// SERVICES
export { CookieService } from 'angular2-cookie/core';
export { HttpService } from './http.service';
export { APIService } from './api.service';
export { AuthService, CanActivateViaAuthGuard } from './auth.service';
export { LocalStorageService, SessionStorageService } from './storage.service';
export { Pagination } from './paging';
export { ValidationService } from './validation.service';
export { ToastService } from './toast.service';



// INTERFACES, TYPES
export class Toast {
  public text?: string = '';
  public type?: string = 'info';
  public autoRemove?: boolean = true;
  public toastLife?: number = 3000;
  public closeButton?: boolean = true;
  public id?: number = Date.now();
}
