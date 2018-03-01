import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';
import { RfqService } from '../../services/rfq.service';

@Component({
  selector: 'app-status-lis-edit',
  templateUrl: './status-lis-edit.component.html',
  styleUrls: ['./status-lis-edit.component.css']
})
export class StatusLisEditComponent implements OnInit {
  action: RFQAction = <RFQAction> {};
  rfqStatus: RFQAction = <RFQAction> {};
constructor(private rfqService: RfqService,
            private StatusDialogRef: MatDialogRef<StatusLisEditComponent> ) {
    }

  ngOnInit() {
    this.rfqStatus = Object.assign({}, this.action);
  }


  async logForm(f: RFQAction) {
    const rfq$ = await this.rfqService.updateStatus(this.action.rfqId, this.action.id, f);
    rfq$.toPromise().then(() => this.StatusDialogRef.close());
    this.action = Object.assign( this.action,  this.rfqStatus);
  }

  closeDialog() {
     this.StatusDialogRef.close();
  }

}
