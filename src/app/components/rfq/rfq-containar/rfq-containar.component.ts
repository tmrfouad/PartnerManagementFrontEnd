import 'rxjs/add/operator/switchMap';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RfqService } from './../../../services/rfq.service';
import { isNullOrUndefined } from 'util';
import { RFQ } from '../../../models/RFQ';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit, OnDestroy {
  rfq;
  rfqStatus;
  listHeight;
  orederIdparam: string;
  rfqs: RFQ[];

  constructor(private activeRoute: ActivatedRoute, public rfqService: RfqService) { }

  async ngOnInit() {
    const get$ = await this.rfqService.get();
    get$.subscribe((rfqs: RFQ[]) => this.rfqs = rfqs);
  }

  ngOnDestroy() {
  }

  onRfqListVisibleClear() {

  }

  onListViewAdd() {
    
  }
  onListViewChange() {

  }
  onListViewDelete() {

  }
  onListViewRefresh() {

  }
}
