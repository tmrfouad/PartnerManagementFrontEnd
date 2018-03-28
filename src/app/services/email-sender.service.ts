import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EmailSender } from '../models/EmailSender';
import { AccountService } from './account.service';
import { IpDataService } from './ip-data.service';
import { NetworkService } from './network.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EmailSenderService extends IpDataService<EmailSender> {
  private currentSenderSource = new BehaviorSubject<EmailSender>(null);
  private currentSendersSource = new BehaviorSubject<EmailSender[]>([]);

  currentSender = this.currentSenderSource.asObservable();
  currentSenders = this.currentSendersSource.asObservable();

  constructor(
    http: HttpClient,
    accountService: AccountService,
    netService: NetworkService) {
    super(http, accountService, netService);
    this.url = '/mailSender';
  }

  changeCurrentSender(sender: EmailSender) {
    this.currentSenderSource.next(sender);
  }

  changeCurrentSenders(Senders: EmailSender[]) {
    this.currentSendersSource.next(Senders);
  }
}
