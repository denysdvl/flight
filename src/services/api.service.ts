import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  get<T>(url: string, opt = {}): Observable<T> {
    const options = Object.assign(opt, this.httpOptions);
    return this.http.get<T>(this.baseUrl + url, options);
  }

  post<Req, Res>(url: string, req: Req, opt = {}): Observable<Res> {
    const options = Object.assign(opt, this.httpOptions);
    return this.http.post<Res>(this.baseUrl + url, req, options);
  }
}
