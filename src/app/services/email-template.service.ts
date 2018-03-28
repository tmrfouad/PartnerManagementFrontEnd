import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EmailTemplate } from '../models/EmailTemplate';
import { MailData } from '../models/MailData';
import { AccountService } from './account.service';
import { IpDataService } from './ip-data.service';
import { NetworkService } from './network.service';

@Injectable()
export class EmailTemplateService extends IpDataService<EmailTemplate> {

  constructor(
    http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);
    this.url = '/mail';
  }

  async send(mail) {
    return this.http.post<MailData>(this.baseUrl + this.url + '/send', mail, { headers: this.headers }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }
}
