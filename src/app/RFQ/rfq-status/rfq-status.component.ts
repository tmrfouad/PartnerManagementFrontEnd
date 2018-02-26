import { Subscription } from 'rxjs/Subscription';
import { RfqService } from './../../services/rfq.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-status',
  templateUrl: './rfq-status.component.html',
  styleUrls: ['./rfq-status.component.css']
})
export class RfqStatusComponent implements OnInit, OnDestroy {
  @Input('rfq') rfq;
  rfqAction;
  rfqStatusSubscription: Subscription;

  constructor(private rfqService: RfqService) { }

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
}
