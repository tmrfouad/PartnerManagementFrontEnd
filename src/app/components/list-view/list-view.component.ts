import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/data-service.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent extends BaseComponent implements OnInit, OnDestroy {
  items: any[] = [];
  visibleItems: any[] = [];

  ItemSubs: Subscription;
  selectedIndex = 0;
  selectedItem: any;
  searchFilter = '';
  tabIndex = 0;

  @Output('change') change = new EventEmitter();

  constructor(
    snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataService: DataService) {

    super(snackBar, dialog);
  }

  async ngOnInit() {
    const get$ = await this.dataService.get();
    this.ItemSubs = get$.subscribe(items => {
      if (items) {
        this.items = items as any[];
        this.applyFilter();
        this.selectItem(items[0], 0);
      }
    });
  }

  ngOnDestroy() {
    this.ItemSubs.unsubscribe();
  }

  selectItem(item, index) {
    this.selectedIndex = index;
    this.selectCurrentItem();
  }

  selectCurrentItem() {
    if (this.selectedIndex > this.visibleItems.length - 1) {
      this.selectedIndex = 0;
    }

    const item = this.visibleItems[this.selectedIndex];
    if (!item) { return; }
    this.change.emit(item);
  }

  applyFilter() {
    const srchFltr = this.searchFilter.toLowerCase();
    this.visibleItems = this.items.filter(r => {
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
    const get$ = await this.dataService.get();
    this.ItemSubs = get$.subscribe(items => {
      if (items) {
        this.items = items as any[];
        this.applyFilter();
        this.selectItem(items[0], 0);
      }
    });
  }

  addRfq() {
    // const subscribeDialog = this.dialog.open(RfqEditFormComponent, {
    //   width: '800px',
    //   height: '530px',
    //   position: {
    //     top: '90px'
    //   },
    //   data: { mode: 'new', rfq: null }
    // });

    // subscribeDialog.afterClosed().subscribe(result => {
    //   if (result) {
    //     if (result.dialogResult === 'save') {
    //       this.refresh();
    //     }
    //   }
    // });
  }

  deleteRfq(rfqId) {
    // this.showConfirm('Are you sure you want to delete this request?', 'Delete Request')
    //   .subscribe(async result => {
    //     if (result === 'ok') {
    //       const delete$ = await this.dataService.delete(rfqId);
    //       delete$.subscribe(() => {
    //         this.refresh();
    //         this.selectItem({}, -1);
    //       });
    //     }
    //   });
  }

  onTabIndexChanged(index) {
    this.tabIndex = index;
    this.applyFilter();
    this.selectCurrentItem();
  }
}
