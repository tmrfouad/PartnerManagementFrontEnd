import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { title: string, message: string }) { }

  confirmOk() {
    this.dialogRef.close('ok');
  }

  confirmCancel() {
    this.dialogRef.close('cancel');
  }
}
