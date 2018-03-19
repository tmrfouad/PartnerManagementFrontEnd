import { Observable } from 'rxjs/Observable';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType } from '../../../models/ActionType';
import { ActionTypeComment } from '../../../models/ActionTypeComment';
import { RFQAction } from '../../../models/RFQAction';
import { RfqService } from '../../../services/rfq.service';
import { BaseComponent } from '../../base-component';
import { REP } from './../../../models/REP';
import { RepService } from './../../../services/rep.service';
import { Subscription } from 'rxjs/Subscription';
import { isNull } from 'util';
import { ActionTypeService } from '../../../services/action-type.service';
import * as FileSaver from 'file-saver';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent extends BaseComponent implements OnInit, OnDestroy {

  action_Types: { value: string, name: string }[] = [];
  actionTypes: { [key: string]: string } = {};

  actionTypeDialog: ActionTypeComment = <ActionTypeComment>{};

  reps: REP[];
  repsSubs: Subscription;

  private _rfqStatus: RFQAction = <RFQAction>{};
  get rfqStatus() {
    return this._rfqStatus;
  }
  set rfqStatus(rfqStatus: RFQAction) {
    this._rfqStatus = rfqStatus;
    // this.repChanged();
  }

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private rfqService: RfqService,
    private repService: RepService,
    private dialogRef: MatDialogRef<StatusEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string, rfqId: number, action: RFQAction },
    private actionTypeService: ActionTypeService) {
    super(snackBar, dialog);

    this.actionTypes = this.actionTypeService.getMapByName();
    this.action_Types = this.actionTypeService.getArray();
  }

  async ngOnInit() {
    this.rfqStatus = Object.assign({}, this.data.action);
    if (this.rfqStatus.representative) {
      this.rfqStatus.representativeId = this.rfqStatus.representative.id;
    }

    const rep$ = await this.repService.get() as Observable<REP[]>;
    this.repsSubs = rep$.subscribe(reps => {
      this.reps = reps;
      // this.repChanged();
    });
  }

  ngOnDestroy() {
    this.repsSubs.unsubscribe();
  }

  async logForm() {
    this.showLoading('Please wait ...');
    if (this.data.mode === 'edit') {
      const rfq$ = await this.rfqService.updateAction(this.data.rfqId, this.data.action.id, this.rfqStatus);
      await rfq$.toPromise().then(() => {
        this.showSnackBar('Action added successfully.', 'Success');
        this.dialogRef.close({ result: 'saved', action: this.rfqStatus });
      }).catch(error => {
        this.showSnackBar(error.message, 'Error', true);
      });
    } else if (this.data.mode === 'new') {
      const addStatus$ = await this.rfqService.addAction(this.data.rfqId, this.rfqStatus);
      await addStatus$.toPromise().then(() => {
        this.showSnackBar('Action updated successfully.', 'Success');
        this.dialogRef.close({ result: 'saved', action: this.rfqStatus });
      }).catch(error => {
        this.showSnackBar(error.message, 'Error', true);
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

  addSummary(summery: string) {
    this.rfqStatus.comments = summery;
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
    const data = new Blob([byteArray], {type: att.fileType});
    FileSaver.saveAs(data, att.fileName);
  }

  repChanged(event) {
    if (this.reps) {
        const representativeId = event.target.value as number;
        this.rfqStatus.representative = this.getRep(representativeId);
    }
  }

  getRep(id): REP {
    // tslint:disable-next-line:radix
    const repId = parseInt(id);
    return this.rfqStatus.representative = this.reps.find(r => r.id === repId);
  }
}
