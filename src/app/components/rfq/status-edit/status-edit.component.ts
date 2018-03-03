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
 rfqOptions: { rfqId: number, addStatus: boolean } =
  { rfqId: 0, addStatus: false } ;
  constructor(private dialogRef: MatDialogRef<StatusEditComponent>) {
  }

  ngOnInit() {
  }

  dialogClosed() {
    this.dialogRef.close();
  }
}
