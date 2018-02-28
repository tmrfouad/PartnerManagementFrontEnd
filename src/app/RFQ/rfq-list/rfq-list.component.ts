import { Subscription } from 'rxjs/Subscription';
import { RFQ } from './../../models/RFQ';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RfqService } from '../../services/rfq.service';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MatDialog } from '@angular/material';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnInit, OnDestroy {

  rfqList;
  rfqListSubscription: Subscription;
  selectedIndex: number = null;
  constructor(private rfqService: RfqService) { }


  @Input('rfqId') rfqId: number;
  @Output('change') change = new EventEmitter();


  async ngOnInit() {
    const rfqList = await this.rfqService.get();
    this.rfqListSubscription = rfqList.subscribe(rfqs => {
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


