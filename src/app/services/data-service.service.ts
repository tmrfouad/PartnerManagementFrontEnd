import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable()
export class DataService<T> {
  protected baseUrl: string;
  protected headers: HttpHeaders;
  private token: string;

  protected url: string;

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService) {

    const domainName = environment.domainName;
    this.baseUrl = domainName;

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'bearer ' + this.accountService.userToken);
  }

  async get() {
    return this.http.get<T[]>(this.baseUrl + this.url + '/get', { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async getById(Id) {
    return this.http.get<T>(this.baseUrl + this.url + '/get/' + Id, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async post(item) {
    return this.http.post<T>(this.baseUrl + this.url + '/post', item, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async put(id, item) {
    return this.http.put<T>(this.baseUrl + this.url + '/put/' + id, item, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async delete(id) {
    return this.http.delete<T>(this.baseUrl + this.url + '/delete/' + id, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

}
