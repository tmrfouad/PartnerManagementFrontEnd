import { Component, EventEmitter, OnDestroy, Output, OnInit } from '@angular/core';
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
export class RfqListComponent extends BaseComponent implements OnInit, OnDestroy {
  rfqs: RFQ[] = [];
  rfqList: RFQ[] = [];
  rfqListSubscription: Subscription;
  selectedIndex: number = null;
  searchFilter = '';

  @Output('change') change = new EventEmitter();

  constructor(
    snackBar: MatSnackBar,
    public dialog: MatDialog,
    private rfqService: RfqService) {

    super(snackBar, dialog);
  }

  async ngOnInit() {
    const get$ = await this.rfqService.get();
    this.rfqListSubscription = get$.subscribe(rfqs => {
      if (rfqs) {
        this.rfqs = rfqs as RFQ[];
        this.applyFilter();
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
    const srchFltr = this.searchFilter.toLowerCase();
    this.rfqList = this.rfqs.filter(r =>
      r.companyEnglishName.toLowerCase().includes(srchFltr) ||
      r.contactPersonEnglishName.toLowerCase().includes(srchFltr) ||
      r.contactPersonEmail.toLowerCase().includes(srchFltr) ||
      r.contactPersonMobile.toLowerCase().includes(srchFltr)
    );
  }

  async refresh() {
    const get$ = await this.rfqService.get();
    this.rfqListSubscription = get$.subscribe(rfqs => {
      if (rfqs) {
        this.rfqs = rfqs as RFQ[];
        this.applyFilter();
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
      .subscribe(async result => {
        if (result === 'ok') {
          const delete$ = await this.rfqService.delete(rfqId);
          delete$.subscribe(() => {
            this.refresh();
            this.selectRfq({}, -1);
          });
        }
      });
  }
}


