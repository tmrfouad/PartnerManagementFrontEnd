import { Component, OnInit } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';
import { RfqService } from '../../services/rfq.service';
import { MatDialogRef } from '@angular/material';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {
  action: RFQAction = <RFQAction> {};
  rfqStatus: RFQAction = <RFQAction> {};

  constructor(private rfqService: RfqService,
              private dialogRef: MatDialogRef<StatusEditComponent>
    ) {
    }

  ngOnInit() {
    this.rfqStatus = Object.assign({}, this.action);
  }


  async logForm(f: RFQAction) {
    const rfq$ = await this.rfqService.updateStatus(this.action.rfqId, this.action.id, f);
    rfq$.toPromise().then(() => this.dialogRef.close());
    this.action = Object.assign( this.action,  this.rfqStatus);
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
