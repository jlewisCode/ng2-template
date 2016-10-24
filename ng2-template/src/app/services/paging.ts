import { AbscractModel, JSDataOptions } from '../models/abstract';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';


export class Pagination {
  public count: number = 0;
  public numPages: number = 0;
  public currentPage: number = 1;
  private http: HttpService;

  constructor (private modelService: AbscractModel, private queryParams: Object = {}) {
    this.http = modelService.http;
  }

  public init (): Observable<any> {
    let params = Object.keys(this.queryParams).map((key) => (
      `${key}=${this.queryParams[key]}`
    )).join('&');
    params = params ? `?${params}` : '';

    let url = `${this.modelService.getFullUrlPath()}${ params }`;
    return this.http.get(url)
      .map((response: any) => {
        if (response.status === 200) {
          this.count = response.count;
          if (response.next == null) {
            this.numPages = 1;
          } else {
            this.numPages = Math.ceil(this.count / response.length);
          }
          return response.results;
        }
        return response;
      });
  }

  public getPage(pageNum: number|string, jsDataOptions: JSDataOptions = {force: false}): Promise<any>{
    this.currentPage = +pageNum;
    let query = this.getQueryParams();
    return this.modelService.readList(query, jsDataOptions);
  }

  public nextPage(jsDataOptions: JSDataOptions = {force: false}): Promise<any>{
    return this.getPage(this.currentPage + 1, jsDataOptions);
  }

  public previousPage(jsDataOptions: JSDataOptions = {force: false}): Promise<any>{
    return this.getPage(this.currentPage - 1, jsDataOptions);
  }

  private getQueryParams () {
    return Object.assign({}, this.queryParams, {page: this.currentPage});
  }
}
