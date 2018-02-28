import { Component, OnInit, Input } from '@angular/core';
import { Countries } from '../models/countries';
import { AcceptService } from '../services/accept.service';
import { RfqService } from '../services/rfq.service';
import { RFQ } from '../models/RFQ';
import { ActionType } from '../models/ActionType';
import { RFQAction } from '../models/RFQAction';
import { MatDialogRef, MatDialog } from '@angular/material';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  countries = Countries.items;
  rfqParameterItem: RFQ = <RFQ> {};
  rfq: RFQ = <RFQ> {};

  constructor(private rfqService: RfqService, private dialogRef: MatDialogRef<TestComponent>) {
  }

  ngOnInit() {
    this.rfq = Object.assign({}, this.rfqParameterItem);
  }

  async submit(f) {
    const rfqItem$ = await this.rfqService.Put(this.rfq.rfqId, f);
    rfqItem$.subscribe(() => {
      this.rfqParameterItem = Object.assign(this.rfqParameterItem, this.rfq);
      alert('request saved');
      this.dialogRef.close();
    }, (error) => {
      alert(error.message);
    });

  }


  closeDialog() {
    this.dialogRef.close();
  }

}
