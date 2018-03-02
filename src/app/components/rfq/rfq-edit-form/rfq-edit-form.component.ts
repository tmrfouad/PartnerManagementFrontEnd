import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Countries } from '../../../models/countries';
import { RFQ } from '../../../models/RFQ';
import { RfqService } from '../../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-edit-form',
  templateUrl: './rfq-edit-form.component.html',
  styleUrls: ['./rfq-edit-form.component.css']
})
export class RfqEditFormComponent implements OnInit {
  countries = Countries.items;
  rfqParameterItem: RFQ = <RFQ> {};
  rfq: RFQ = <RFQ> {};

  constructor(
    private rfqService: RfqService,
    private dialogRef: MatDialogRef<RfqEditFormComponent>) {
  }

  ngOnInit() {
    this.rfq = Object.assign({}, this.rfqParameterItem);
  }

  async submit(f) {
    f.universalIP = '';
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
