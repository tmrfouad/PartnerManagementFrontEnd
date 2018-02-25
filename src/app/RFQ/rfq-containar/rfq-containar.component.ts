import { RFQ } from './../../models/RFQ';
import { RfqService } from './../../services/rfq.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'rfq-containar',
  templateUrl: './rfq-containar.component.html',
  styleUrls: ['./rfq-containar.component.css']
})
export class RfqContainarComponent implements OnInit {
 
  @Input('') rfqList : RFQ [] = [] ;

  rfqId;
  rfq ;


  constructor(private activeRoute: ActivatedRoute, private rfqService : RfqService) { 
    //this.rfqList = 
  }

  orederIdparam : string;

 async ngOnInit() {
 
  }

  onclick() { 
  }

  onrfqChange(rfqItem){
    this.rfq = rfqItem ;
  }

}
