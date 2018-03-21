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
import { RfqSharedService } from '../../../services/rfq-shared.service';
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

  constructor(
    private rfqService: RfqService,
    private dialog: MatDialog,
    private statusService: StatusService,
    private actionTypeService: ActionTypeService,
    private sharedService: RfqSharedService) {

    this.statusesMap = this.statusService.getMapByValue();
    this.actiontypesMap = this.actionTypeService.getMapByValue();
    this.actiontypesArray = this.actionTypeService.getArray();

    this.rfqSubs = this.sharedService.currentRfq.subscribe(async rfq => {
      this.rfq = rfq;
      this.statusListHidden = true;
      this.isRfqLoaded = true;
      if (rfq && rfq.rfqId) {
        const rfqStatus$ = await this.rfqService.getStatus(rfq.rfqId);
        this.sharedService.changeCurrentRfqStatus(await rfqStatus$.toPromise());
      } else {
        this.sharedService.changeCurrentRfqStatus(null);
      }
    });

    this.sharedService.currentRfqStatus.subscribe(rfqStatus => {
      this.rfqStatus = rfqStatus;
      this.isRfqStatusLoaded = true;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.rfqSubs.unsubscribe();
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
    }).afterClosed().subscribe((result: { result: string, action: RFQAction }) => {
      if (result && result.result === 'saved') {
        this.sharedService.changeCurrentRfq(this.rfq);
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
        this.sharedService.changeCurrentRfq(this.rfq);
      }
    });
  }
}
