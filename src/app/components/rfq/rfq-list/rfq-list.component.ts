import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { RfqService } from '../../../services/rfq.service';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';
import { BaseComponent } from '../../base-component';
import { RFQ } from '../../../models/RFQ';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent extends BaseComponent implements OnDestroy {
  rfqs: RFQ[] = [];
  rfqList: RFQ[] = [];
  rfqListSubscription: Subscription;
  selectedIndex: number = null;
  searchFilter: string;

  @Output('change') change = new EventEmitter();

  constructor(
    snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rfqService: RfqService) {

    super(snackBar, dialog);

    this.rfqListSubscription = this.rfqService.get()
      .subscribe(rfqs => {
        if (rfqs) {
          this.rfqs = rfqs as RFQ[];
          this.rfqList = this.rfqs;
          this.selectRfq(rfqs[0], 0);
        }
      });
  }

  ngOnDestroy() {
    this.rfqListSubscription.unsubscribe();
  }

  selectRfq(rfq, index) {
    this.selectedIndex = index;
    this.change.emit(rfq);
  }

  applyFilter() {
    this.rfqList = this.rfqs.filter(r => r.companyEnglishName.includes(this.searchFilter));
  }

  refresh() {
    this.rfqListSubscription = this.rfqService.get()
      .subscribe(rfqs => {
        if (rfqs) {
          this.rfqs = rfqs as RFQ[];
          this.rfqList = this.rfqs;
          this.selectRfq(rfqs[0], 0);
        }
      });
  }

  addRfq() {
    const subscribeDialog = this.dialog.open(RfqEditFormComponent, {
      width: '800px',
      height: '530px',
      position: {
        top: '90px'
      },
      data: 'new'
    });

    subscribeDialog.afterClosed().subscribe(result => {
      if (result.dialogResult === 'save') {
        this.refresh();
      }
    });
  }

  deleteRfq(rfqId) {
    this.showConfirm('Are you sure you want to delete this request?', 'Delete Request')
      .subscribe(result => {
        if (result === 'ok') {
          this.rfqService.Delete(rfqId).subscribe(() => {
            this.refresh();
            this.selectRfq({}, -1);
          });
        }
      });
  }
}


