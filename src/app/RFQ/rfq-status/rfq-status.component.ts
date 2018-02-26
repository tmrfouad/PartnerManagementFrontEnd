import { Component, OnInit, Input } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-status',
  templateUrl: './rfq-status.component.html',
  styleUrls: ['./rfq-status.component.css']
})
export class RfqStatusComponent implements OnInit {
  @Input('rfqAction') rfqAction: RFQAction;

  constructor() { }

  ngOnInit() {
  }

}
