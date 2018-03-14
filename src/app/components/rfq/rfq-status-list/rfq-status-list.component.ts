import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RFQ } from '../../../models/RFQ';
import { RFQAction } from '../../../models/RFQAction';
import { ActionType } from './../../../models/ActionType';
import { RfqService } from './../../../services/rfq.service';
import { StatusEditFormComponent } from '../status-edit-form/status-edit-form.component';
import { Subscription } from 'rxjs/Subscription';
import { ActionTypeService } from '../../../services/action-type.service';

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
  StatusDialogRef: MatDialogRef<StatusEditFormComponent>;
  rfqActionsSub: Subscription;
  actionTypesMap: { [key: string]: string };

  get rfq(): RFQ {
    return this._rfq;
  }
  @Input('rfq') set rfq(rfq: RFQ) {
    this._rfq = rfq;
    if (rfq) {
      this.rfqService.getActions(rfq.rfqId).then(r => this.rfqActions$ = r);
    }
  }

  get reload(): boolean {
    return this._reload;
  }
  @Input('reload') set reload(reload: boolean) {
    this._reload = reload;
    if (reload) {
      this.rfqService.getActions(this.rfq.rfqId).then(r => {
        this.rfqActions$ = r;
        this.reload = false;
      });
    }
  }

  constructor(
    private rfqService: RfqService,
    private dialog: MatDialog,
    private actionTypeService: ActionTypeService) {
    const types = Object.keys(ActionType);
    this.actionTypesMap = this.actionTypeService.getMapByValue();
  }

  ngOnInit() {
  }

  openStatusEditDialog(action: RFQAction) {

    this.StatusDialogRef = this.dialog.open(StatusEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: 'edit'
    });
    this.StatusDialogRef.componentInstance.action = action;
    this.StatusDialogRef.afterClosed().subscribe(() => this.StatusDialogRef = null);
  }

}
