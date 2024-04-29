import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public host = `https://localhost:7064/api/`;
  constructor(private _http: HttpClient, public router: Router) {}

  public post(url: string, obj: any) {
    const body = JSON.stringify(obj);
    // const body = obj;
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .post<any>(this.host + url, body, {headers: headerOptions})
      .pipe(
        map(res => {

          return res;
        })
      );
  }
  public put(url: string, obj: any) {
    const body = JSON.stringify(obj);
    // const body = obj;
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .put<any>(this.host + url, body, {headers: headerOptions})
      .pipe(
        map(res => {

          return res;
        })
      );
  }

  sendMail(url: string, obj: any) {
    const body = JSON.stringify(obj);
    // const body = obj;
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'multipart/form-data';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .post<any>(this.host + url, body, {headers: headerOptions})
      .pipe(
        map(res => {

          return res;
        })
      );
  }

  public get(url: string) {
    // let cloneHeader: any = {};
    // cloneHeader['Content-Type'] = 'application/json';
    // const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .get(this.host + url)
      .pipe(
        map(res  => {
          return res;
        })
      );
  }
  public delete(url: string) {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this._http
      .delete<any>(this.host + url)
      .pipe(
        map(res => {

          return res;
        })
      );
  }
}
