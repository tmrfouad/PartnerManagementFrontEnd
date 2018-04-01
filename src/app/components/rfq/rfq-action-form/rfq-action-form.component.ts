import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ActionTypeService } from '../../../services/action-type.service';
import { StatusService } from '../../../services/status.service';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';
import { StatusEditFormComponent } from '../status-edit-form/status-edit-form.component';
import { ActionType } from './../../../models/ActionType';
import { RFQ } from './../../../models/RFQ';
import { RFQAction } from './../../../models/RFQAction';
import { RfqService } from './../../../services/rfq.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-action-form',
  templateUrl: './rfq-action-form.component.html',
  styleUrls: ['./rfq-action-form.component.css']
})
export class RfqActionFormComponent implements OnInit, OnDestroy {
  statusListHidden = true;
  // reloadActions = false;
  statusesMap: { [key: string]: string } = {};
  actiontypesMap: { [key: string]: string } = {};
  actiontypesArray: { value: string, name: string }[] = [];
  isRfqLoaded = false;
  isRfqStatusLoaded = false;
  rfqSubs: Subscription;
  rfq: RFQ;
  rfqStatus: RFQAction;
  rfqActions: RFQAction[];
  rfqs: RFQ[];

  constructor(
    private rfqService: RfqService,
    private dialog: MatDialog,
    private statusService: StatusService,
    private actionTypeService: ActionTypeService) {

    this.statusesMap = this.statusService.getMapByValue();
    this.actiontypesMap = this.actionTypeService.getMapByValue();
    this.actiontypesArray = this.actionTypeService.getArray();

    this.rfqSubs = this.rfqService.currentItem.subscribe(async rfq => {
      this.rfq = rfq;
      this.statusListHidden = true;
      this.isRfqLoaded = true;
      if (rfq && rfq.rfqId) {
        const rfqStatus$ = await this.rfqService.getStatus(rfq.rfqId);
        this.rfqService.changeCurrentRfqStatus(await rfqStatus$.toPromise());
      } else {
        this.rfqService.changeCurrentRfqStatus(null);
      }
    });

    this.rfqService.currentRfqStatus.subscribe(rfqStatus => {
      this.rfqStatus = rfqStatus;
      this.isRfqStatusLoaded = true;
    });

    this.rfqService.currentRfqActions.subscribe(rfqActions => {
      this.rfqActions = rfqActions;
    });

    this.rfqService.currentItems.subscribe(rfqs => {
      this.rfqs = rfqs;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.rfqSubs.unsubscribe();
  }

  addAction(actionType: ActionType) {
    const action: RFQAction = {
      actionType: actionType
    };
    const StatusDialogRef = this.dialog.open(StatusEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: {
        mode: 'new',
        rfqId: this.rfq.rfqId,
        action: action,
        rfq: this.rfq
      }
    }).afterClosed().subscribe((result: { result: string, action: RFQAction }) => {
      if (result && result.result === 'saved') {
        this.rfqService.changeCurrentRfqStatus(result.action);
        this.rfqActions.push(result.action);
        this.rfqService.changeCurrentRfqActions(this.rfqActions);
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
      data: { mode: 'edit', rfq: this.rfq }
    }).afterClosed().subscribe((result: { dialogResult: string, rfq: RFQ }) => {
      if (result) {
        if (result.dialogResult === 'save') {
          if (result.rfq) {
            this.rfqService.changeCurrentItem(result.rfq);
            const indx = this.rfqs.indexOf(result.rfq);
            this.rfqs[indx] = result.rfq;
            this.rfqService.changeCurrentItems(this.rfqs);
          }
        }
      }
    });
  }

  openStatusEditDialog(action: RFQAction) {
    this.dialog.open(StatusEditFormComponent, {
      width: '800px',
      height: '530px',
      position: { top: '100px' },
      data: {
        mode: 'edit',
        rfqId: this.rfq.rfqId,
        action: action
      }
    }).afterClosed().subscribe((result: { result: string, action: RFQAction }) => {
      if (result && result.result === 'saved') {
        this.rfqService.changeCurrentItem(this.rfq);
      }
    });
  }
}
