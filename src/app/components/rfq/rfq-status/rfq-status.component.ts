import { Subscription } from 'rxjs/Subscription';
import { RfqService } from './../../../services/rfq.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RFQAction } from '../../../models/RFQAction';
import { ActionType } from '../../../models/enumerations/ActionType';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-status',
  templateUrl: './rfq-status.component.html',
  styleUrls: ['./rfq-status.component.css']
})
export class RfqStatusComponent implements OnInit, OnDestroy {
  private _rfq;
  rfqAction;
  rfqStatus;
  actionType_Names: string[];
  actionType_Values: string[];
  statusListHidden = true;

  rfqStatusSubscription: Subscription;

  get rfq() {
    return this._rfq;
  }
  @Input('rfq') set rfq(rfq) {
    this._rfq = rfq;
    // const getStatus$ = await this.rfqService.getStatus(rfq.rfqId);
    // getStatus$.subscribe(newStatus => {
    //     this.rfqStatus = newStatus as RFQAction;
    //   });
  }

  constructor(private rfqService: RfqService) {
    const types = Object.keys(ActionType);
    this.actionType_Names = types.slice(types.length / 2);
    this.actionType_Values = types.slice(0, types.length / 2);
  }

  async ngOnInit() {
    const status$ = await this.rfqService.getStatus(this.rfq.rfqId);
    this.rfqStatusSubscription = status$.subscribe(status => {
      if (status) {
        this.rfqAction = status;
      }
    });
  }

  ngOnDestroy() {
    this.rfqStatusSubscription.unsubscribe();
  }

  toggleStatusList() {
    this.statusListHidden = !this.statusListHidden;
  }
}
