import { Injectable } from '@angular/core';
import { DataService } from './data-service.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { NetworkService } from './network.service';

@Injectable()
export class IpDataService<T> extends DataService<T> {

  constructor(
    http: HttpClient,
    accountService: AccountService,
    protected netService: NetworkService) {

    super(http, accountService);
  }

  async post(item) {
    const universalIP = await this.netService.getIp();
    item.universalIP = universalIP;
    return super.post(item);
  }

  async put(id, item) {
    const universalIP = await this.netService.getIp();
    item.universalIP = universalIP;
    return super.put(id, item);
  }
}
