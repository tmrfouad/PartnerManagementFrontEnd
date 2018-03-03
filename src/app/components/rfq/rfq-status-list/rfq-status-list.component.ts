import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RFQ } from '../../../models/RFQ';
import { RFQAction } from '../../../models/RFQAction';
import { StatusLisEditComponent } from '../status-lis-edit/status-lis-edit.component';
import { ActionType } from './../../../models/ActionType';
import { RfqService } from './../../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-status-list',
  templateUrl: './rfq-status-list.component.html',
  styleUrls: ['./rfq-status-list.component.css']
})
export class RfqStatusListComponent implements OnInit {
  private _rfq;
  private _reload;
  rfqActions$;
  actionType_Names: string[];
  actionType_Values: string[];
  StatusDialogRef: MatDialogRef<StatusLisEditComponent>;
  get rfq(): RFQ {
    return this._rfq;
  }
  @Input('rfq') set rfq(rfq: RFQ) {
    this._rfq = rfq;
    if (rfq) {
      this.rfqService.getActions(rfq.rfqId)
        .then(rfqActions$ => this.rfqActions$ = rfqActions$);
    }
  }

  get reload(): boolean {
    return this._reload;
  }
  @Input('reload') set reload(reload: boolean) {
    this._reload = reload;
    if (reload) {
      this.rfqService.getActions(this.rfq.rfqId)
        .then(rfqActions$ => {
          this.rfqActions$ = rfqActions$;
          this.reload = false;
        });
    }
  }

  constructor(private rfqService: RfqService, private dialog: MatDialog) {
    const types = Object.keys(ActionType);
    this.actionType_Names = types.slice(types.length / 2);
    this.actionType_Values = types.slice(0, types.length / 2);
  }

  ngOnInit() {
  }

  openStatusEditDialog(action: RFQAction) {

    this.StatusDialogRef = this.dialog.open(StatusLisEditComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' }
    });
    this.StatusDialogRef.componentInstance.action = action;
    this.StatusDialogRef.afterClosed().subscribe(() => this.StatusDialogRef = null);
  }

}
