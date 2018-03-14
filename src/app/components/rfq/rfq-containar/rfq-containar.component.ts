import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RfqService } from './../../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit, OnDestroy {
  rfq;
  rfqStatus$;
  listHeight;
  orederIdparam: string;

  constructor(private activeRoute: ActivatedRoute, private rfqService: RfqService) {}

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
