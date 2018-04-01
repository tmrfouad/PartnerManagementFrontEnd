import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EmailSender } from '../models/EmailSender';
import { AccountService } from './account.service';
import { IpDataService } from './abstracts/ip-data.service';
import { NetworkService } from './network.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EmailSenderService extends IpDataService<EmailSender> {
  constructor(
    http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);
    this.url = '/mailSender';
  }
}
