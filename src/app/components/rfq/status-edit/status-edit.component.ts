import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RFQAction } from '../../../models/RFQAction';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {
  action: RFQAction = <RFQAction>{};
 rfqOptions: { rfqId: number, reloadActions: boolean, addStatus: boolean } =
  { rfqId: 0, reloadActions: false, addStatus: false } ;
  constructor(private dialogRef: MatDialogRef<StatusEditComponent>) {
   // this.rfqOptions.addStatus = false;
  }

  ngOnInit() {
  }

  dialogClosed() {
    this.dialogRef.close();
  }

  reload() {
    this.rfqOptions.reloadActions = true;
  }
}
