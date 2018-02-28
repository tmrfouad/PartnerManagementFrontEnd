import 'rxjs/add/operator/switchMap';

import { Component, Input } from '@angular/core';
import { isNumber } from 'util';

import { ActionType } from './../../models/ActionType';
import { RFQ } from './../../models/RFQ';
import { RFQAction } from './../../models/RFQAction';
import { RfqService } from './../../services/rfq.service';
import { NetworkService } from '../../services/network.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TestComponent } from '../../test/test.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent {
  private _rfqStatus: RFQAction;
  actionTypeNames: string[];
  actionTypeValues: string[];

  @Input('rfq') rfq: RFQ;
  get rfqStatus(): RFQAction {
    return this._rfqStatus;
  }
  @Input('rfqStatus') set rfqStatus(status: RFQAction) {
    this._rfqStatus = status;
  }

  constructor(
    private rfqService: RfqService,
    private netService: NetworkService,
    private dialog: MatDialog) {

    const types = Object.keys(ActionType);
    this.actionTypeNames = types.slice(types.length / 2).filter(a => a !== 'None');
    this.actionTypeValues = types.slice(0, types.length / 2).filter(a => a !== '0');
  }

  dialogRef: MatDialogRef<TestComponent>;
  async addAction(actionTypeName: string) {
    const actionType: ActionType = ActionType[actionTypeName];
    const universalIP = await this.netService.getIp();
    const action: RFQAction = {
      actionTime: new Date(),
      actionType: actionType,
      companyRepresentative: '',
      comments: '',
      submissionTime: new Date(),
      universalIP: universalIP
    };
    (await this.rfqService.addStatus(this.rfq.rfqId, action))
      .subscribe(newStatus => {
        this.rfqStatus = JSON.parse(newStatus);
      });
  }

  onClick(rfqItem) {
    if (this.dialogRef == null) {
      this.dialogRef = this.dialog.open(TestComponent,
        {
          width: '900px',
          height: '600px',
          position: { top: '80px' }
        },
      );
      this.dialogRef.componentInstance.rfq = rfqItem;
    }
    this.dialogRef.afterClosed().subscribe(() => this.dialogRef = null);
  }
}
