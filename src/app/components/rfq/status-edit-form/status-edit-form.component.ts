import { Observable } from 'rxjs/Observable';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { ActionType } from '../../../models/ActionType';
import { ActionTypeComment } from '../../../models/ActionTypeComment';
import { RFQAction } from '../../../models/RFQAction';
import { RfqService } from '../../../services/rfq.service';
import { BaseComponent } from '../../base-component';
import { REP } from './../../../models/REP';
import { RepService } from './../../../services/rep.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent extends BaseComponent implements OnInit {

  action_Types: { value: string, name: string }[] = [];
  actionTypes: { [key: string]: string } = {};
  actionType_Names: string[];
  actionType_Values: string[];
  actionTypeDialog: ActionTypeComment = <ActionTypeComment>{};

  rep$: Observable<{}>;
  action: RFQAction = <RFQAction>{};
  actualAction: RFQAction = <RFQAction>{};
  rfqStatus: RFQAction = <RFQAction>{};
  rfqOptions: { rfqId: number, addStatus: boolean } =
    { rfqId: 0, addStatus: false };
  dialogResult = 'cancel';

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private rfqService: RfqService,
    private repService: RepService,
    private dialogRef: MatDialogRef<StatusEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    super(snackBar, dialog);
    const types = Object.keys(ActionType);
    this.actionType_Names = types.slice(types.length / 2);
    this.actionType_Values = types.slice(0, types.length / 2);

    for (let i = 0; i < this.actionType_Names.length; i++) {
      const typeName = this.actionType_Names[i];
      const typeValue = this.actionType_Values[i];

      this.actionTypes[typeName] = typeValue;
      this.action_Types.push({ value: typeValue, name: typeName });
    }

  }

  async ngOnInit() {
    this.rfqStatus = Object.assign({}, this.action);
    if (this.actualAction) {
      if (Object.keys(this.actualAction).length > 0) {
        this.action = Object.assign({}, this.actualAction);
      }
    }
    this.rep$ = await this.repService.get();
  }

  async logForm(f: RFQAction) {
    this.dialogResult = 'save';
    this.showLoading('Please wait ...');
    if (!this.rfqOptions.addStatus) {
      const rfq$ = await this.rfqService.updateStatus(this.action.rfqId, this.action.id, f);
      await rfq$.toPromise().then(() => {
        this.action = Object.assign(this.action, this.rfqStatus);
        this.showSnackBar('Action added successfully.', 'Success');
        this.dialogRef.close();
      }).catch(error => {
        this.showSnackBar(error.message, 'Error', true);
      });
    } else {
      const addStatus$ = await this.rfqService.addStatus(this.rfqOptions.rfqId, f);
      await addStatus$.toPromise().then(() => {
        this.showSnackBar('Action updated successfully.', 'Success');
        this.dialogRef.close();
      }).catch(error => {
        this.showSnackBar(error.message, 'Error', true);
      });
    }
    const getStatus$ = await this.rfqService.getStatus(this.rfqOptions.rfqId);
    getStatus$.subscribe(newStatus => {
      this.rfqStatus = newStatus as RFQAction;
      this.action = Object.assign(this.action, newStatus);
    });
    this.closeLoading();
  }

  closeForm() {
    // tslint:disable-next-line:curly
    if (this.actualAction)
      this.action = Object.assign({}, this.actualAction);

    this.dialogRef.close();
  }

  addSummary(summery: string) {
    this.rfqStatus.comments = summery;
  }

}
