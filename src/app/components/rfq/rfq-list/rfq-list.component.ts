import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RfqService } from '../../../services/rfq.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnDestroy {
  rfqList;
  rfqListSubscription: Subscription;
  selectedIndex: number = null;
  @Output('change') change = new EventEmitter();

  constructor(private rfqService: RfqService) {
    this.rfqListSubscription = this.rfqService.get()
      .subscribe(rfqs => {
        if (rfqs) {
          this.rfqList = rfqs;
          this.filter(rfqs[0], 0);
        }
      });
  }

  ngOnDestroy() {
    this.rfqListSubscription.unsubscribe();
  }

  filter(rfqItem, index) {
    this.selectedIndex = index;
    this.change.emit(rfqItem);
  }
}


