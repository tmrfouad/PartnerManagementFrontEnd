import { RFQ } from './../../models/RFQ';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent implements OnInit {

  @Input('rfq') rfq: RFQ;
 

  constructor() { 
  }


  async ngOnInit() {

  }


}
