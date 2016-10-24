import { Observable } from 'rxjs';
import { HttpService } from '../services';
import DataStore from '../services/store';
import config from '../services/api.config';


interface ListResponse {
  results: Array<any>[];
  count: number;
  previous: string;
  next: string;
}

interface HTTPMethods {
  get(options?: Object): Observable<any>;
  post(body: Object, options?: Object): Observable<any>;
  put(body: Object, options?: Object): Observable<any>;
};

export interface JSDataOptions {
  force: boolean;
  raw?: boolean;
}

export class AbscractModel {

  private dataStore = DataStore;

  constructor (
    protected modelName: string,
    protected endpoint: string,
    public http: HttpService
  ) {}

  public read (id: number|string, options: JSDataOptions = {force: false}): Promise<any> {
    return this.dataStore.find(this.modelName, id);
  }

  public readList (params: {} = {}, options: JSDataOptions = {force: false}): Promise<any> {
    return this.dataStore.findAll(this.modelName, params, options);
  }

  public readListPaged (params: {} = {}, options: JSDataOptions = {force: false}): Promise<any> {
    let firstPageHandler = (resolve: Function, reject: Function) => {
      this.http.get(`${config.apiUrl}/${this.endpoint}/`)
        .subscribe(
          (response: any) => resolve(response),
          (error: any) => reject(error)
        );
    };

    return new Promise(firstPageHandler)
      .then((r: ListResponse) => {
        // r === first page results object
        // immediately resolve first page results array
        let promises: Promise<any>[] = [Promise.resolve(r.results)];
        // if there is more than one page of results
        if (r.next) {
          // construct each page url for each existing page, starting at 2
          for (let i = 2; i <= Math.ceil(r.count / r.results.length); i++) {
            let promise = this.http.get(`${config.apiUrl}/${this.endpoint}/`, Object.assign(params, {page: i}))
              .toPromise().then((response: any) => response.results);
            promises.push(promise);
          }
        }

        // pass along aggregate promise to promise chain
        return Promise.all(promises).then((allResults: any[]) => {
          let flatArr = allResults.reduce((bigArr, thisArr) => bigArr.concat(thisArr), []);
          this.dataStore.add(this.modelName, flatArr);

          // retrieve store records and pass along to promise chain
          return this.dataStore.getAll(this.modelName);
        });
      });
  }

  public create (attrs: {}, options?: {}): Promise<any> {
    return this.dataStore.create(this.modelName, attrs, options);
  }

  public update (id: number|string, attrs: {}, options?: {}): Promise<any> {
    return this.dataStore.update(this.modelName, id, attrs, options );
  }

  public destroy (id: number|string): Promise<any> {
    return this.dataStore.destroy(this.modelName, id);
  }

  public getFullUrlPath (): string {
    return `${config.createWithApiUrl(this.endpoint)}/`;
  }

  public detailRoute (id: number|string, path: string): HTTPMethods {
    let url = `${this.getFullUrlPath()}${id}/${path}`;
    return this.createRouteObj(url);
  }

  public listRoute(path: string): HTTPMethods {
    return this.createRouteObj(this.getFullUrlPath() + path);
  }

  public add (data: Object | Array<Object>): Array<any> | Object {
    return this.dataStore.add(this.modelName, data);
  }

  private createRouteObj(url: string): HTTPMethods {
    return {
      post: this.http.post.bind(this.http, url),
      get: this.http.get.bind(this.http, url),
      put: this.http.put.bind(this.http, url),
    };
  }


}
