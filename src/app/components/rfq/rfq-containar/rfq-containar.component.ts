import { Subscription } from 'rxjs/Subscription';
import { RFQ } from './../../../models/RFQ';
import { RfqService } from './../../../services/rfq.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit, OnDestroy {
  rfq;
  rfqStatus$;

  constructor(private activeRoute: ActivatedRoute, private rfqService: RfqService) {
  }

  orederIdparam: string;

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  async onRfqChange(rfqItem) {
    if (rfqItem) {
      this.rfq = rfqItem;
      if (rfqItem.rfqId != null) {
        this.rfqStatus$ = await this.rfqService.getStatus(this.rfq.rfqId);
      } else {
        this.rfqStatus$ = Observable.empty();
      }
    }
  }

}
