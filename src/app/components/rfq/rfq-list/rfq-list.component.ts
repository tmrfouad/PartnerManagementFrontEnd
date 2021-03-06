import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { RFQ } from '../../../models/RFQ';
import { RfqService } from '../../../services/rfq.service';
import { BaseComponent } from '../../base-component';
import { RfqEditFormComponent } from '../rfq-edit-form/rfq-edit-form.component';
import { AppComponent } from '../../../app.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-list',
  templateUrl: './rfq-list.component.html',
  styleUrls: ['./rfq-list.component.css']
})
export class RfqListComponent extends BaseComponent implements OnInit, OnDestroy {
  rfqs: RFQ[] = [];
  rfqList: RFQ[];
  isLoaded = false;
  rfqListSubscription: Subscription;
  selectedIndex = 0;
  searchFilter = '';
  tabIndex = 0;

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
        this.rfqService.changeCurrentItems(this.rfqs);
        this.applyFilter();
        this.selectRfq(0);
        this.isLoaded = true;
      }
    });

    this.rfqService.currentItems.subscribe(rfqs => {
      this.rfqs = rfqs;
      this.applyFilter();
    });
  }

  ngOnDestroy() {
    this.rfqListSubscription.unsubscribe();
  }

  selectRfq(index) {
    this.selectedIndex = index;
    this.selectCurrentRfq();
  }

  selectCurrentRfq() {
    if (this.selectedIndex > this.rfqList.length - 1) {
      this.selectedIndex = 0;
    }

    const rfq = this.rfqList[this.selectedIndex];
    this.rfqService.changeCurrentItem(rfq);
  }

  applyFilter() {
    const srchFltr = this.searchFilter.toLowerCase();
    this.rfqList = this.rfqs.filter(r => {
      const tabFilter = this.tabIndex === 0 ?
        (r.status === 0 || r.status === 1 || r.status === 3) :
        true;
      return (r.companyEnglishName.toLowerCase().includes(srchFltr) ||
        r.contactPersonEnglishName.toLowerCase().includes(srchFltr) ||
        r.contactPersonEmail.toLowerCase().includes(srchFltr) ||
        r.contactPersonMobile.toLowerCase().includes(srchFltr)) && tabFilter;
    });
  }

  async refresh() {
    this.isLoaded = false;
    const get$ = await this.rfqService.get();
    this.rfqListSubscription = get$.subscribe(rfqs => {
      if (rfqs) {
        this.rfqs = rfqs as RFQ[];
        this.applyFilter();
        this.selectRfq(0);
        this.isLoaded = true;
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
      data: { mode: 'new', rfq: null }
    });

    subscribeDialog.afterClosed().subscribe(result => {
      if (result) {
        if (result.dialogResult === 'save') {
          if (result.rfq) {
            this.rfqs.push(result.rfq);
            this.rfqService.changeCurrentItems(this.rfqs);
          }
        }
      }
    });
  }

  deleteRfq(rfqId) {
    this.showConfirm('Are you sure you want to delete this request?', 'Delete Request')
      .subscribe(async result => {
        if (result === 'ok') {
          const delete$ = await this.rfqService.delete(rfqId);
          delete$.subscribe((rfq: RFQ) => {
            const indx = this.rfqs.indexOf(rfq);
            this.rfqs.splice(indx, 1);
            this.rfqService.changeCurrentItems(this.rfqs);
            this.selectRfq(-1);
          });
        }
      });
  }

  onTabIndexChanged(index) {
    this.tabIndex = index;
    this.applyFilter();
    this.selectCurrentRfq();
  }
}


