import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data-service.service';
import { AccountService } from './account.service';

@Injectable()
export class RfqService extends DataService {

  constructor(
    http: HttpClient,
    accountService: AccountService) {
    super(http, accountService);

    this.url = '/rfq';
  }

  async getStatus(id) {
    await this.config;
    return this.http.get(`${this.baseUrl + this.url}/status/${id}`, { headers: this.headers });
  }
}
