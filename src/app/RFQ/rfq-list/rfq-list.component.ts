import { Subscription } from 'rxjs/Subscription';
import { RFQ } from './../../models/RFQ';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RfqService } from '../../services/rfq.service';
import { Observable } from 'rxjs/Observable';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnInit {

  rfqList$;
  selectedIndex: number = null;
  constructor(private rfqService: RfqService) { }

  @Input('rfqId') rfqId: number;
  @Output('change') change = new EventEmitter();


  async ngOnInit() {
    this.rfqList$ = await this.rfqService.get();
  }

  filter(rfqItem, index) {
    this.selectedIndex = index;
    this.change.emit(rfqItem);
  }


}
