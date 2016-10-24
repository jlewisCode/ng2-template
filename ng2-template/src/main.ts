declare let NODE_ENV: string;
declare let require: any; // webpack typings do not currently include the context method for some reason
require.context('./assets/', true, /^\.\/.*\.*/); // require all assets, so webpack can transfer them all over to build

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import AppModule from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

if (NODE_ENV === 'production') {
  enableProdMode();
}
