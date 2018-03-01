import { Component, OnInit } from '@angular/core';
import { RFQAction } from '../../models/RFQAction';
import { RfqService } from '../../services/rfq.service';
import { MatDialogRef } from '@angular/material';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {
  action: RFQAction;

  constructor(private rfqService: RfqService,
    private dialogRef: MatDialogRef<RfqEditFormComponent>) { }

  ngOnInit() {
  }

}
