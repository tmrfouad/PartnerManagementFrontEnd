import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-edit-form',
  templateUrl: './rfq-edit-form.component.html',
  styleUrls: ['./rfq-edit-form.component.css']
})
export class RfqEditFormComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RfqEditFormComponent>) { }

  ngOnInit() {
  }

}
