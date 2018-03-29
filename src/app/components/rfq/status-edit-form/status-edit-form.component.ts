import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';

import { RFQAction } from '../../../models/RFQAction';
import { SummaryDetails } from '../../../models/SummaryDetails';
import { ActionTypeService } from '../../../services/action-type.service';
import { RfqService } from '../../../services/rfq.service';
import { SummarySharedService } from '../../../services/summary-shared.service';
import { BaseComponent } from '../../base-component';
import { REP } from './../../../models/REP';
import { RepService } from './../../../services/rep.service';
import { MailContent } from '../../../models/MailContent';
import { ActionType } from '../../../models/ActionType';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent extends BaseComponent implements OnInit, OnDestroy {

  action_Types: { value: string, name: string }[] = [];
  actionTypes: { [key: string]: string } = {};
  reps: REP[];
  repsSubs: Subscription;
  subscription: Subscription;
  mailContent: MailContent;
  rfqStatus: RFQAction = {};

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private summarySharedServ: SummarySharedService,
    private rfqService: RfqService,
    private repService: RepService,
    private dialogRef: MatDialogRef<StatusEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, rfqId: number, action: RFQAction },
    private actionTypeService: ActionTypeService) {
    super(snackBar, dialog);
    this.actionTypes = this.actionTypeService.getMapByName();
    this.action_Types = this.actionTypeService.getArray();

    const subscription = Observable.combineLatest(
      summarySharedServ.actionTypeCurrent.map((result: ActionType) => result),
      summarySharedServ.currentActionSummeryDetails.map((result: SummaryDetails) => result),
      summarySharedServ.currentMailDetails.map((result: MailContent) => result)
    );

    this.subscription = subscription.subscribe((result: [ActionType, SummaryDetails, MailContent]) => {
      const [actionTypeCurrent, currentActionSummeryDetails, currentMailDetails] = result;

      this.rfqStatus.actionType = actionTypeCurrent;

      this.rfqStatus.comments = currentActionSummeryDetails.summary;
      this.rfqStatus.active = currentActionSummeryDetails.active;

      this.mailContent = currentMailDetails;
    });

  }

  async ngOnInit() {

    Object.assign(this.rfqStatus, this.data.action);
    this.rfqStatus.rfqActionAtts = [];
    this.summarySharedServ.chanageActionType(this.rfqStatus.actionType);

    const rep$ = await this.repService.get() as Observable<REP[]>;
    this.repsSubs = rep$.subscribe(reps => {
      this.reps = reps;
    });
  }

  ngOnDestroy() {
    this.repsSubs.unsubscribe();
    this.subscription.unsubscribe();
  }

  async logForm() {
    this.showLoading('Please wait ...');
    if (this.data.mode === 'edit') {
      const rfq$ = await this.rfqService.updateAction(this.data.rfqId, this.data.action.id, this.rfqStatus);
      await rfq$.toPromise().then((newAction: RFQAction) => {
        this.showSnackBar('Action updated successfully.', 'Success');
        this.getRep();
        this.rfqStatus = newAction;
        this.dialogRef.close({ result: 'saved', action: this.rfqStatus });
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else if (this.data.mode === 'new') {
      const addStatus$ = await this.rfqService.addAction(this.data.rfqId, this.rfqStatus);
      await addStatus$.toPromise().then((newAction: RFQAction) => {
        this.showSnackBar('Action added successfully.', 'Success');
        this.getRep();
        this.rfqStatus = newAction;
        this.dialogRef.close({ result: 'saved', action: this.rfqStatus });
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
    const getStatus$ = await this.rfqService.getStatus(this.data.rfqId);
    getStatus$.subscribe(newStatus => {
      this.rfqStatus = newStatus as RFQAction;
    });
    this.closeLoading();
  }

  closeForm() {
    this.dialogRef.close({ result: 'canceled' });
  }

  addSummary(summaryDetails: SummaryDetails) {
    if (summaryDetails) {
      this.rfqStatus.comments = summaryDetails.summary;
    }
    this.rfqStatus.active = summaryDetails.active;
  }

  attachmentChanged(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.rfqStatus.rfqActionAtts.push({ fileName: file.name, fileType: file.type, value: reader.result.split(',')[1] });
        event.target.value = null;
      };
    }
  }

  deleteAttachment(att) {
    const index = this.rfqStatus.rfqActionAtts.indexOf(att);
    this.rfqStatus.rfqActionAtts.splice(index, 1);
  }

  viewAttachment(att) {
    const byteChars = atob(att.value);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const data = new Blob([byteArray], { type: att.fileType });
    FileSaver.saveAs(data, att.fileName);
  }

  getRep() {
    if (this.reps) {
      this.rfqStatus.representative = this.reps.find(r => r.id.toString() === this.rfqStatus.representativeId.toString());
    }
  }

  changeActionType() {
    this.summarySharedServ.chanageActionType(this.rfqStatus.actionType);
    this.summarySharedServ.chanageActionSummeryDetails({ summary: '', active: false });
  }
}
