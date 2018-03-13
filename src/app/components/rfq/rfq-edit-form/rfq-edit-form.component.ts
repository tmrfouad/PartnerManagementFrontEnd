import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Countries } from '../../../models/countries';
import { RFQ } from '../../../models/RFQ';
import { RfqService } from '../../../services/rfq.service';
import { BaseComponent } from '../../base-component';
import { NetworkService } from '../../../services/network.service';
import { StatusService } from '../../../services/status.service';
import { Status } from '../../../models/Status';
import { ActionType } from '../../../models/ActionType';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-edit-form',
  templateUrl: './rfq-edit-form.component.html',
  styleUrls: ['./rfq-edit-form.component.css']
})
export class RfqEditFormComponent extends BaseComponent implements OnInit {
  countries = Countries.items;
  rfqParameterItem: RFQ = <RFQ>{};
  rfq: RFQ = <RFQ>{};
  sendEmail = false;
  statuses: { value: string, name: string }[] = [];

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private rfqService: RfqService,
    private netService: NetworkService,
    private statusService: StatusService,
    private dialogRef: MatDialogRef<RfqEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData) {
    super(snackBar, dialog);

    this.statuses = this.statusService.getArray();
  }

  ngOnInit() {
    if (this.dialogData === 'edit') {
      this.rfq = Object.assign({}, this.rfqParameterItem);
    } else {
      this.rfq.targetedProduct = 'Process Perfect';
      this.rfq.status = 'New';
    }
  }

  async submit(f) {
    this.showLoading('Please wait ...');
    if (this.dialogData === 'new') {
      f.sendEmail = this.sendEmail;
      const rfqItem$ = await this.rfqService.post(f);
      rfqItem$.subscribe(() => {
        this.rfqParameterItem = Object.assign(this.rfqParameterItem, this.rfq);
        this.closeLoading();
        this.showSnackBar('Request saved successfully', 'Success');
        this.dialogRef.close({ dialogResult: 'save' });
      }, (error) => {
        this.closeLoading();
        this.showSnackBar(error.message, 'Error', true);
      });
    } else {
      const rfqItem$ = await this.rfqService.put(this.rfq.rfqId, f);
      rfqItem$.subscribe(() => {
        this.rfqParameterItem = Object.assign(this.rfqParameterItem, this.rfq);
        this.closeLoading();
        this.showSnackBar('Request saved successfully', 'Success');
        this.dialogRef.close({ dialogResult: 'save' });
      }, (error) => {
        this.closeLoading();
        this.showSnackBar(error.message, 'Error', true);
      });
    }
  }


  closeDialog() {
    this.dialogRef.close({ dialogResult: 'cancel' });
  }
}
