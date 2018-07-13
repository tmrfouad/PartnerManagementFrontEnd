import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { ActionType } from '../models/enumerations/ActionType';
import { SummaryDetails } from '../models/SummaryDetails';
import { MailData } from '../models/MailData';
import { RFQ } from '../models/RFQ';

@Injectable()
export class SummarySharedService {

  private actionTypeshared = new BehaviorSubject<ActionType>(null);
  actionTypeCurrent = this.actionTypeshared.asObservable();

  private actionSummeryDetailsshared = new BehaviorSubject<SummaryDetails>({ summary: '', active: false });
  currentActionSummeryDetails = this.actionSummeryDetailsshared.asObservable();


  // this service to send the rfq from the to the child component
  // and the mailContnte to be able to send the mail data to the server
  private sharedMailContent = new BehaviorSubject<{ rfq?: RFQ, mailContent?: MailData, mailType?: string }>({});
  currentMailContent = this.sharedMailContent.asObservable();


  constructor() {
  }

  chanageActionType(actionType: ActionType) {
    this.actionTypeshared.next(actionType);
  }

  chanageActionSummeryDetails(summaryDetails: SummaryDetails) {
    this.actionSummeryDetailsshared.next(summaryDetails);
  }

  changeMailContent(options: {mailContent?: MailData, mailType?: string }) {
    this.sharedMailContent.next(options);
  }

}
