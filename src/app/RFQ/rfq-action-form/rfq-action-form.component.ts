import 'rxjs/add/operator/switchMap';

import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RFQ } from './../../models/RFQ';
import { RFQAction } from './../../models/RFQAction';
import { RfqService } from './../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent {
  private _rfqStatus: RFQAction;
  @Input('rfq') rfq: RFQ;
  get rfqStatus(): RFQAction { return this._rfqStatus; }
  @Input('rfqStatus') set rfqStatus(status: RFQAction) {
    this._rfqStatus = status;
    console.log(this._rfqStatus);
  }

  constructor(private rfqService: RfqService) {
  }
}
