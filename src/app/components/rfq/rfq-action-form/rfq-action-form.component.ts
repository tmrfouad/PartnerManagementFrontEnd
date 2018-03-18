import 'rxjs/add/operator/switchMap';

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StatusService } from '../../../services/status.service';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';
import { StatusEditFormComponent } from '../status-edit-form/status-edit-form.component';
import { ActionType } from './../../../models/ActionType';
import { RFQ } from './../../../models/RFQ';
import { RFQAction } from './../../../models/RFQAction';
import { RfqService } from './../../../services/rfq.service';
import { ActionTypeService } from '../../../services/action-type.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent {
  private _rfq: RFQ;
  private _rfqStatus: RFQAction;
  // actionType_Names: string[];
  // actionType_Values: string[];
  // actionTypeNames: string[];
  // actionTypeValues: string[];
  statusListHidden = true;
  reloadActions = false;
  statusesMap: { [key: string]: string } = {};
  actiontypesMap: { [key: string]: string } = {};
  actiontypesArray: { value: string, name: string }[] = [];

  get rfq() {
    return this._rfq;
  }
  @Input('rfq') set rfq(rfq: RFQ) {
    this._rfq = rfq;
    this.statusListHidden = true;
  }

  get rfqStatus(): RFQAction {
    return this._rfqStatus;
  }
  @Input('rfqStatus') set rfqStatus(status: RFQAction) {
    this._rfqStatus = status;
  }

  constructor(
    private rfqService: RfqService,
    private dialog: MatDialog,
    private statusService: StatusService,
    private actionTypeService: ActionTypeService) {

    this.statusesMap = this.statusService.getMapByValue();
    this.actiontypesMap = this.actionTypeService.getMapByValue();
    this.actiontypesArray = this.actionTypeService.getArray();
  }

  addAction(actionType: ActionType) {
    const action: RFQAction = {
      actionType: actionType,
      representativeId: 0
    };
    const StatusDialogRef = this.dialog.open(StatusEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: {
        mode: 'new',
        rfqId: this.rfq.rfqId,
        action: action
      }
    });
    this.reloadActions = false;

    StatusDialogRef.afterClosed()
      .subscribe((result: {result: string, action: RFQAction}) => {
        if (result && result.result === 'saved') {
          this.reloadActions = true;
          this.rfqStatus = result.action;
        }
      });
  }

  toggleStatusList() {
    this.statusListHidden = !this.statusListHidden;
  }

  openRfqEditDialog() {
    const rfqDialogRef = this.dialog.open(RfqEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: 'edit'
    });
    rfqDialogRef.componentInstance.rfqParameterItem = this.rfq;
  }

  openStatusEditDialog(action: RFQAction) {
    const StatusDialogRef = this.dialog.open(StatusEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: {
        mode: 'edit',
        rfqId: this.rfq.rfqId,
        action: action
      }
    });
    StatusDialogRef.afterClosed().subscribe((result: {result: string, action: RFQAction}) => {
      if (result && result.result === 'saved') {
        this.reloadActions = true;
        this.rfqStatus = result.action;
      }
    });
  }
}
