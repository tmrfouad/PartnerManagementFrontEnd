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
  rfq: RFQ = <RFQ> {};
  getedItem: RFQ = <RFQ> {};

  constructor(private rfqService: RfqService, private dialogRef: MatDialogRef<TestComponent>) {
  }

  ngOnInit() {
  }

  async submit(f) {
    console.log(f);

    // const rfqItem$ = await this.rfqService.Put(this.rfq.rfqId, f);
    // rfqItem$.subscribe(() => {
    //   alert('mission accomplished');
    //   this.dialogRef.close();
    // }, (error) => {
    //   alert(error);
    // });

  }


  closeDialog() {
    this.dialogRef.close();
  }

}
