import { Subscription } from 'rxjs/Subscription';
import { RFQ } from './../../models/RFQ';
import { RfqService } from './../../services/rfq.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit, OnDestroy {
  rfqId;
  rfq;
  rfqStatus;
  rfqStatusSubscription: Subscription;

  constructor(private activeRoute: ActivatedRoute, private rfqService: RfqService) {
  }

  orederIdparam: string;

  async ngOnInit() {

  }

  ngOnDestroy() {
    this.rfqStatusSubscription.unsubscribe();
  }

  async onrfqChange(rfqItem) {
    if (rfqItem) {
      this.rfq = rfqItem;
      const status$ = await this.rfqService.getStatus(this.rfq.rfqId);
      this.rfqStatusSubscription = status$.subscribe(status => {
        if (status) {
          this.rfqStatus = status;
        } else {
          this.rfqStatus = {};
        }
      });
    }
  }

}
