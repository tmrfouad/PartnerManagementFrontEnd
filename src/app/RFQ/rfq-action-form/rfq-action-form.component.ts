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

  @Input('rfq') rfq: RFQ;
  @Input('rfqStatus') rfqStatus: RFQAction;
  rfqStatusSubscription: Subscription;


  constructor(private rfqService: RfqService) {
  }
}
