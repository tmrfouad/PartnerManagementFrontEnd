import { Subscription } from 'rxjs/Subscription';
import { RFQ } from './../../models/RFQ';
import { Component, OnInit, Input, OnDestroy, Output,EventEmitter } from '@angular/core';
import { RfqService } from '../../services/rfq.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnInit ,OnDestroy{

  rfqList$;
  subscribtion: Subscription;
  selectedIndex: number = null;
  constructor(private rfqService : RfqService) { }

  @Input('rfqId') rfqId : number;
  @Output('change') change = new EventEmitter();


   ngOnInit() {
     this.rfqList$ = this.rfqService.get();
  }

  ngOnDestroy() {}


  filter(rfqItem, index) {
    this.selectedIndex = index ;
    this.change.emit(rfqItem);
  }

  
}
