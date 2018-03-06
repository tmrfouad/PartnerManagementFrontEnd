import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RFQAction } from '../../../models/RFQAction';
import { RfqService } from '../../../services/rfq.service';
import { ActionType } from '../../../models/ActionType';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit-form',
  templateUrl: './status-edit-form.component.html',
  styleUrls: ['./status-edit-form.component.css']
})
export class StatusEditFormComponent implements OnInit {

  action_Types: {value: string, name: string}[] = [];
  actionTypes: {[key: string]: string} = {};
  actionType_Names: string[];
  actionType_Values: string[];
  actionTypeNames: string[];
  actionTypeValues: string[];

  action: RFQAction = <RFQAction>{};
  actualAction: RFQAction = <RFQAction>{};
  rfqStatus: RFQAction = <RFQAction>{};
   rfqOptions: { rfqId: number, addStatus: boolean } =
    { rfqId: 0, addStatus: false } ;


  constructor(private rfqService: RfqService, private dialogRef: MatDialogRef<StatusEditFormComponent>) {
    const types = Object.keys(ActionType);
    this.actionType_Names = types.slice(types.length / 2);
    this.actionType_Values = types.slice(0, types.length / 2);
    this.actionTypeNames = types.slice(types.length / 2).filter(a => a !== 'None');
    this.actionTypeValues = types.slice(0, types.length / 2).filter(a => a !== '0');

    for (let i = 0; i < this.actionType_Names.length; i++) {
      const typeName = this.actionType_Names[i];
      const typeValue = this.actionType_Values[i];

      this.actionTypes[typeName] = typeValue;
      this.action_Types.push({value: typeValue, name: typeName});
    }
  }

  ngOnInit() {
   this.rfqStatus = Object.assign({}, this.action);
   // tslint:disable-next-line:curly
   if ( Object.keys(this.actualAction).length > 0) {
     this.action = Object.assign({}, this.actualAction);
    }
  }

  async logForm(f: RFQAction) {
    if (!this.rfqOptions.addStatus) {
    console.log(this.action);
      const rfq$ = await this.rfqService.updateStatus(this.action.rfqId, this.action.id, f);
      rfq$.toPromise().then(() => {
        this.action = Object.assign(this.action, this.rfqStatus);
        this.dialogRef.close();
      });
    } else {
      const addStatus$ = await this.rfqService.addStatus(this.rfqOptions.rfqId, f);
      await addStatus$.toPromise();
      const getStatus$ = await this.rfqService.getStatus(this.rfqOptions.rfqId);
      getStatus$.subscribe(newStatus => {
          this.rfqStatus = newStatus as RFQAction;
          this.action = Object.assign(this.action, newStatus);
          this.dialogRef.close();
        });
    }
  }

  closeForm() {
    // tslint:disable-next-line:curly
    if (this.actualAction)
      this.action = Object.assign({}, this.actualAction);

    this.dialogRef.close();
  }

}
