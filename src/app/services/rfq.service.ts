import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data-service.service';
import { AccountService } from './account.service';
import { RFQAction } from '../models/RFQAction';
import { NetworkService } from './network.service';

@Injectable()
export class RfqService extends DataService {

  constructor(
    http: HttpClient,
    accountService: AccountService,
    private netService: NetworkService) {
    super(http, accountService);

    this.url = '/rfq';
  }

  async getStatus(id) {
    await this.config;
    return this.http.get(`${this.baseUrl + this.url}/status/${id}`, { headers: this.headers });
  }

  async getActions(id) {
    await this.config;
    return this.http.get(`${this.baseUrl + this.url}/actions/${id}`, { headers: this.headers });
  }

  async addStatus(id, action: RFQAction) {
    await this.config;
    const universalIP = await this.netService.getIp();
    action.universalIP = universalIP;
    return this.http.post(`${this.baseUrl + this.url}/addStatus/${id}`, action, { headers: this.headers });
  }

  async updateStatus(id, actionId, action: RFQAction) {
    await this.config;
    const universalIP = await this.netService.getIp();
    action.universalIP = universalIP;
    return this.http.post(`${this.baseUrl + this.url}/updateStatus/${id}/${actionId}`, action, { headers: this.headers });
  }
}
