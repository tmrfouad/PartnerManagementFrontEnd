import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RFQAction } from '../models/RFQAction';
import { AccountService } from './account.service';
import { IpDataService } from './ip-data.service';
import { NetworkService } from './network.service';

@Injectable()
export class RfqService extends IpDataService {

  constructor(
    http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);

    this.url = '/rfq';
  }

  async getStatus(id) {
    return this.http.get(`${this.baseUrl + this.url}/status/${id}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async getActions(id) {
    return this.http.get(`${this.baseUrl + this.url}/actions/${id}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async getActionById(id, actionId) {
    return this.http.get(`${this.baseUrl + this.url}/action/${id}/${actionId}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async addAction(id, action: RFQAction) {
    const universalIP = await this.netService.getIp();
    action.universalIP = universalIP;
    return this.http.post(`${this.baseUrl + this.url}/addStatus/${id}`, action, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async updateAction(id, actionId, action: RFQAction) {
    const universalIP = await this.netService.getIp();
    action.universalIP = universalIP;
    return this.http.put(`${this.baseUrl + this.url}/updateStatus/${id}/${actionId}`, action, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async deleteAction(id, actionId) {
    return this.http.delete(`${this.baseUrl + this.url}/deleteStatus/${id}/${actionId}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }
}
