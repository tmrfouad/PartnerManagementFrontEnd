import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RFQ } from '../models/RFQ';
import { RFQAction } from '../models/RFQAction';

@Injectable()
export class RfqSharedService {
  private currentRfqSource = new BehaviorSubject<RFQ>(null);
  private currentRfqsSource = new BehaviorSubject<RFQ[]>([]);
  private currentRfqStatusSource = new BehaviorSubject<RFQAction>(null);
  private currentRfqActionsSource = new BehaviorSubject<RFQAction[]>([]);

  currentRfq = this.currentRfqSource.asObservable();
  currentRfqs = this.currentRfqsSource.asObservable();
  currentRfqStatus = this.currentRfqStatusSource.asObservable();
  currentRfqActions = this.currentRfqActionsSource.asObservable();

  constructor() { }

  changeCurrentRfq(rfq: RFQ) {
    this.currentRfqSource.next(rfq);
  }

  changeCurrentRfqs(rfqs: RFQ[]) {
    this.currentRfqsSource.next(rfqs);
  }

  changeCurrentRfqStatus(rfqStatus: RFQAction) {
    this.currentRfqStatusSource.next(rfqStatus);
  }

  changeCurrentRfqActions(rfqActions: RFQAction[]) {
    this.currentRfqActionsSource.next(rfqActions);
  }
}
