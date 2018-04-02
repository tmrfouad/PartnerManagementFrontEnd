import 'rxjs/add/observable/combineLatest';

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ActionType } from '../../../models/ActionType';
import { MailData, MailMessageData } from '../../../models/MailData';
import { RFQ } from '../../../models/RFQ';
import { RFQAction } from '../../../models/RFQAction';
import { SummaryDetails } from '../../../models/SummaryDetails';
import { ActionTypeService } from '../../../services/action-type.service';
import { RfqService } from '../../../services/rfq.service';
import { SummarySharedService } from '../../../services/summary-shared.service';
import { BaseComponent } from '../../base-component';
import { REP } from './../../../models/REP';
import { RepService } from './../../../services/rep.service';
import { EmailTemplateService } from '../../../services/email-template.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent extends BaseComponent implements OnInit, OnDestroy {

  action_Types: { value: string, name: string }[] = [];
  actionTypes: { [key: string]: string } = {};
  actionTypesById: { [key: string]: string } = {};
  reps: REP[];
  repsSubs: Subscription;
  // this object is to send the rfq to MailContentComponent to ba able to send the data
  rfqStatus: RFQAction = {};
  mailData: { maildata?: MailData, mailType?: string } = {};
  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private summarySharedServ: SummarySharedService,
    private rfqService: RfqService,
    private repService: RepService,
    private emailTemplateService: EmailTemplateService,
    private dialogRef: MatDialogRef<StatusEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, rfqId: number, action: RFQAction, rfq: RFQ },
    private actionTypeService: ActionTypeService) {
    super(snackBar, dialog);
    this.actionTypes = this.actionTypeService.getMapByName();
    this.actionTypesById = this.actionTypeService.getMapByValue();
    this.action_Types = this.actionTypeService.getArray();

    this.summarySharedServ.changeMailContent({ mailContent: <MailData>{}, mailType: 'sendmail' });

    summarySharedServ.actionTypeCurrent.subscribe(result => {
      this.rfqStatus.actionType = result;
    });

    summarySharedServ.currentActionSummeryDetails.subscribe(result => {
      this.rfqStatus.comments = result.summary;
      this.rfqStatus.active = result.active;
    });

    if (this.data.mode === 'new') {
      summarySharedServ.currentMailContent.subscribe(result => {
        this.mailData.mailType = result.mailType;
        this.mailData.maildata = result.mailContent;
      });
    }

  }

  async ngOnInit() {
    this.rfqStatus = {};
    Object.assign(this.rfqStatus, this.data.action);
    this.rfqStatus.rfqActionAtts = [];
    this.summarySharedServ.chanageActionType(this.rfqStatus.actionType);
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.rfqStatus.comments, active: false });
    if (this.data.mode === 'new') { this.summarySharedServ.changeMailContent({}); }
    const rep$ = await this.repService.get() as Observable<REP[]>;
    this.repsSubs = rep$.subscribe(reps => {
      this.reps = reps;
    });

    // (5) => refer To EmailMessage
    if (+this.rfqStatus.actionType === 5) {
      this.fillMailData('sendmail');
    }
  }

  ngOnDestroy() {
    this.repsSubs.unsubscribe();
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
      await addStatus$.toPromise().then(async (newAction: RFQAction) => {
        this.showSnackBar('Action added successfully.', 'Success');
        this.getRep();
        const emailtemp = await this.emailTemplateService.send(this.mailData.maildata);
        emailtemp.subscribe((mailItem: MailData) => { this.mailData.maildata = mailItem; });
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
    if (+this.rfqStatus.actionType === 5) {
      this.fillMailData('sendmail');
    } else {
      this.fillMailData('reportmail');
    }
    this.summarySharedServ.chanageActionSummeryDetails({ summary: '', active: false });
  }


  fillMailData(type: string) {
    this.mailData.maildata = <MailData>{};
    this.mailData.maildata.message = <MailMessageData>{};
    if (this.mailData.maildata.message.to && this.mailData.maildata.message.to.length >= 0) {
      this.mailData.maildata.message.to[0] = this.data.rfq.contactPersonEmail;
    }
    // this.mailData.maildata.message.to[0] = this.data.rfq.contactPersonEmail;
    this.mailData.mailType = type;
    if (this.data.mode === 'new') {
      this.summarySharedServ.changeMailContent(
        { mailContent: this.mailData.maildata, mailType: this.mailData.mailType }
      );
    }
  }
}
