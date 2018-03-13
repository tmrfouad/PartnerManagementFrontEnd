import { REP } from './../models/REP';
import { NetworkService } from './network.service';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RepService extends DataService {

constructor(http: HttpClient,
              accountService: AccountService,
              private networkService: NetworkService) {
              super(http, accountService);
              this.url = '/Rep';
}

async addRep(rep: REP) {
  const universalIP = await this.networkService.getIp();
  rep.universalIP = universalIP ;
  return this.http.post(`${this.baseUrl + this.url + '/Post'}`, rep, {headers: this.headers});
}


}
