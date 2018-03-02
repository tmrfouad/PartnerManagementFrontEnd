import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { RFQAction } from '../../../models/RFQAction';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'status-lis-edit',
  templateUrl: './status-lis-edit.component.html',
  styleUrls: ['./status-lis-edit.component.css']
})
export class StatusLisEditComponent implements OnInit {
  action: RFQAction = <RFQAction>{};

  constructor(private StatusDialogRef: MatDialogRef<StatusLisEditComponent>) {
  }

  ngOnInit() {
  }

  dialogClosed() {
    this.StatusDialogRef.close();
  }

}
