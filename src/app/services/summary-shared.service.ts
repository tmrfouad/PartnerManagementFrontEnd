import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { ActionType } from '../models/ActionType';
import { SummaryDetails } from '../models/SummaryDetails';
import { MailContent } from '../models/MailContent';
import { MailData } from '../models/MailData';

@Injectable()
export class SummarySharedService {

  private actionTypeshared = new BehaviorSubject<ActionType>(null);
  actionTypeCurrent = this.actionTypeshared.asObservable();

  private actionSummeryDetailsshared = new BehaviorSubject<SummaryDetails>({ summary: '', active: false });
  currentActionSummeryDetails = this.actionSummeryDetailsshared.asObservable();

  private sendMailShared = new BehaviorSubject<{ maildata?: MailData, mailType?: string }>({});
  currentMailDetails = this.sendMailShared.asObservable();


  constructor() {
  }

  chanageActionType(actionType: ActionType) {
    this.actionTypeshared.next(actionType);
  }

  chanageActionSummeryDetails(summaryDetails: SummaryDetails) {
    this.actionSummeryDetailsshared.next(summaryDetails);
  }

  changeSendMailDetails(mailContent: { maildata?: MailData, mailType?: string }) {
    this.sendMailShared.next(mailContent);
  }

}
