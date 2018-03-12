import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RFQAction } from '../../../models/RFQAction';
import { RfqService } from '../../../services/rfq.service';
import { ActionType } from '../../../models/ActionType';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { BaseComponent } from '../../base-component';
import { ActionTypeComment } from '../../../models/ActionTypeComment';

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
  actionTypeNames: string[];
  actionTypeValues: string[];
  actionTypeDialog: ActionTypeComment = <ActionTypeComment>{};


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
    private dialogRef: MatDialogRef<StatusEditFormComponent>) {
    super(snackBar, dialog);
    const types = Object.keys(ActionType);
    this.actionType_Names = types.slice(types.length / 2);
    this.actionType_Values = types.slice(0, types.length / 2);
    this.actionTypeNames = types.slice(types.length / 2).filter(a => a !== 'None');
    this.actionTypeValues = types.slice(0, types.length / 2).filter(a => a !== '0');

    for (let i = 0; i < this.actionType_Names.length; i++) {
      const typeName = this.actionType_Names[i];
      const typeValue = this.actionType_Values[i];

      this.actionTypes[typeName] = typeValue;
      this.action_Types.push({ value: typeValue, name: typeName });
    }
  }

  ngOnInit() {
    this.rfqStatus = Object.assign({}, this.action);
    // tslint:disable-next-line:curly
    this.rfqStatus.comments = ' ';
    console.log(this.rfqStatus);
    if (Object.keys(this.actualAction).length > 0) {
      this.action = Object.assign({}, this.actualAction);
    }
  }

  async logForm(f: RFQAction) {
    this.dialogResult = 'save';
    this.showLoading('Please wait ...');
    if (!this.rfqOptions.addStatus) {
      // f.comments = this.addSummery();
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
    const getStatus$ = this.rfqService.getStatus(this.rfqOptions.rfqId);
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
