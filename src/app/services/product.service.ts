import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AccountService } from './account.service';
import { IpDataService } from './ip-data.service';
import { NetworkService } from './network.service';

@Injectable()
export class ProductService extends IpDataService {

  constructor(
    http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);

    this.url = '/product';
  }

  async getEditions(id) {
    return this.http.get(`${this.baseUrl + this.url}/editions/${id}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async getEditionById(id, editionId) {
    return this.http.get(`${this.baseUrl + this.url}/editions/${id}/${editionId}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async addEdition(id, edition) {
    const universalIP = await this.netService.getIp();
    edition.universalIP = universalIP;
    return this.http.post(`${this.baseUrl + this.url}/addEdition/${id}`, edition, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async updateEdition(id, editionId, edition) {
    const universalIP = await this.netService.getIp();
    edition.universalIP = universalIP;
    return this.http.put(`${this.baseUrl + this.url}/updateEdition/${id}/${editionId}`, edition, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  async deleteEdition(id, editionId) {
    return this.http.delete(`${this.baseUrl + this.url}/DeleteEdition/${id}/${editionId}`, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }
}