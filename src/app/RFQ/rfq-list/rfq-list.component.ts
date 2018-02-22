import { RFQ } from './../../models/RFQ';
import { Component, OnInit, Input } from '@angular/core';
import { RfqService } from '../../services/rfq.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent implements OnInit {

  rfqList : RFQ [] = [] ;
  constructor(private rfqService : RfqService) {   
  }

  @Input('orederId') orederId ;
  
  async ngOnInit() {

    await this.rfqService.get().subscribe(RFQItems => {
       this.rfqList =RFQItems as (RFQ []) ;
     }) ;

  }


}
