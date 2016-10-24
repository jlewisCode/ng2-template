import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpAdapter } from 'js-data-http';
import DataStore from './store';
import config from './api.config';

@Injectable()
export class APIService {

  private dataStore = DataStore;
  private adapter = new HttpAdapter(this.adapterDefaults());

  constructor() {
    this.resetHeaders();
  }

  public resetHeaders (): void {
    this.adapter = new HttpAdapter(this.adapterDefaults());
    this.registerAdapter(this.adapter);
  }

  public updateHeader (headerKey: string, headerValue: string): void {
    let newAdapterOptions = this.adapterDefaults();
    newAdapterOptions.httpConfig.headers[headerKey] = headerValue;
    this.adapter = new HttpAdapter(newAdapterOptions);
    this.registerAdapter(this.adapter);
  }

  private adapterDefaults () {
    return {
      basePath: config.apiUrl, // i.e. http://localhost:8000/api (see api.config.ts)
      forceTrailingSlash: true,
      httpConfig: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
      deserialize: (resourceConfig: any, response: any) => {
        let data = response.data;
        if (data && 'count' in data && 'next' in data && 'results' in data) {
          data = data.results;
        }
        return data;
      },
    };
  };

  private registerAdapter (adapterInstance: HttpAdapter): void {
    this.dataStore.registerAdapter('http', adapterInstance, { default: true });
  }

}
