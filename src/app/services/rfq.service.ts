import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data-service.service';
import { AccountService } from './account.service';

@Injectable()
export class RfqService extends DataService {
  private _http: HttpClient;
  private _accountService: AccountService;

  constructor(
    http: HttpClient,
    accountService: AccountService) {
    super(http, accountService);

    this._http = http;
    this._accountService = accountService;
    this.url = '/rfq';
  }

  getStatus(id) {
    this.headers.set('Authorization', 'bearer ' + this._accountService.userToken);
    return this._http.get(`${this.baseUrl + this.url}/status/${id}`, { headers: this.headers });
  }
}
