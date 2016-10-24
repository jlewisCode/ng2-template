import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import * as Components from './components';
import * as Shared from './components/shared';
// import * as Directives from './directives';
// import * as Pipes from './pipes';
import * as Models from './models';
import {
  CookieService,
  CanActivateViaAuthGuard,
  HttpService,
  APIService,
  AuthService,
  ToastService
} from './services';



@NgModule({
  // list of modules that are being imported into this module
  // everything from the imported modules will be available to declarations of this module
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    routing,
  ],
  // list of components, directives, and pipes that belong to this module
  declarations: [
    AppComponent,
    ...Object.keys(Components).map(k => Components[k]),
    ...Object.keys(Shared).map(k => Shared[k]),
    // ...Object.keys(Directives).map(k => Directives[k]),
    // ...Object.keys(Pipes).map(k => Pipes[k]),
  ],
  // list of module top-level dependency injection providers available module-wide
  providers: [
    Title,
    CookieService,
    CanActivateViaAuthGuard,
    HttpService,
    APIService,
    AuthService,
    ToastService,
    ...Object.keys(Models).map(k => Models[k]),
  ],
  // list of components to bootstrap when this module is bootstrapped in main.ts
  bootstrap: [ AppComponent ],
})

export default class AppModule {}
