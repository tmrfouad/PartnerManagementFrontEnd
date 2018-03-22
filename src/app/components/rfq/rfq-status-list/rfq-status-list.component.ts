import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { RFQ } from '../../../models/RFQ';
import { RFQAction } from '../../../models/RFQAction';
import { ActionType } from './../../../models/ActionType';
import { RfqService } from './../../../services/rfq.service';
import { StatusEditFormComponent } from '../status-edit-form/status-edit-form.component';
import { Subscription } from 'rxjs/Subscription';
import { ActionTypeService } from '../../../services/action-type.service';
import { RfqSharedService } from '../../../services/rfq-shared.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-status-list',
  templateUrl: './rfq-status-list.component.html',
  styleUrls: ['./rfq-status-list.component.css']
})
export class RfqStatusListComponent implements OnInit {
  // private _rfq;
  // private _reload;
  rfqActions$;
  StatusDialogRef: MatDialogRef<StatusEditFormComponent>;
  rfqActionsSub: Subscription;
  actionTypesMap: { [key: string]: string };
  rfq: RFQ;
  rfqStatus: RFQAction;
  rfqActions: RFQAction[] = [];

  constructor(
    private rfqService: RfqService,
    private dialog: MatDialog,
    private actionTypeService: ActionTypeService,
    private sharedService: RfqSharedService) {

    const types = Object.keys(ActionType);
    this.actionTypesMap = this.actionTypeService.getMapByValue();

    this.sharedService.currentRfq.subscribe(async rfq => {
      this.rfq = rfq;
      if (rfq) {
        const rfqActions$ = await this.rfqService.getActions(rfq.rfqId);
        rfqActions$.subscribe((rfqActions: RFQAction[]) => {
          this.sharedService.changeCurrentRfqActions(rfqActions);
        });
      }
    });

    this.sharedService.currentRfqStatus.subscribe(rfqStatus => {
      this.rfqStatus = rfqStatus;
    });

    this.sharedService.currentRfqActions.subscribe((rfqActions: RFQAction[]) => {
      this.rfqActions = rfqActions;
    });
  }

  ngOnInit() {
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
    }).afterClosed().subscribe(async (result: { result: string, action: RFQAction }) => {
      if (result && result.result === 'saved') {
        const indx = this.rfqActions.findIndex(a =>
          a.rfqId === this.rfq.rfqId &&
          a.id === action.id);
        this.rfqActions[indx] = result.action;
        this.sharedService.changeCurrentRfqActions(this.rfqActions);

        if (this.rfqStatus.rfqId === action.rfqId &&
          this.rfqStatus.id === action.id) {

          this.sharedService.changeCurrentRfqStatus(result.action);
        }
      }
    });
  }

}
