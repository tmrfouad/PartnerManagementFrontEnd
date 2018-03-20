import { REP } from './../models/REP';
import { NetworkService } from './network.service';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service.service';
import { Injectable } from '@angular/core';
import { IpDataService } from './ip-data.service';

@Injectable()
export class RepService extends IpDataService {

  constructor(http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);
    this.url = '/Rep';
  }
}
