import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EmailTemplate } from '../models/EmailTemplate';
import { MailData } from '../models/MailData';
import { AccountService } from './account.service';
import { IpDataService } from './abstracts/ip-data.service';
import { NetworkService } from './network.service';
import { RFQ } from '../models/RFQ';

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

  getTags(): {key: string, name: string}[] {
    return [
      { key: 'address', name: 'Address' },
      { key: 'companyEnglishName', name: 'Company Name' },
      { key: 'contactPersonEmail', name: 'Contact Person Email' },
      { key: 'contactPersonMobile', name: 'Contact Person Mobile' },
      { key: 'contactPersonEnglishName', name: 'Contact Person Name' },
      { key: 'contactPersonPosition', name: 'Contact Person Position' },
      { key: 'location', name: 'Location' },
      { key: 'phoneNumber', name: 'Phone Number' },
      { key: 'rfqCode', name: 'RFQ Code' },
      { key: 'selectedEdition', name: 'Selected Edition' },
      { key: 'status', name: 'Status' },
      { key: 'targetedProduct', name: 'Targeted Product' },
      { key: 'website', name: 'Website' }
    ];
  }

  buildTempBody(htmlTemplate: string, rfq: RFQ): string {
    let result = htmlTemplate;
    this.getTags().forEach(tag => {
      result = result.split(`{{ ${tag.key} }}`).join(rfq[tag.key]);
    });
    return result;
  }
}
