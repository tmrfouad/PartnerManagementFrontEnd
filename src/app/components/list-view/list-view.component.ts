import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DataService } from '../../services/abstracts/data-service.service';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent<T> extends BaseComponent implements OnInit, OnDestroy {
  @Input('title') title: string;
  @Input('displayMembers') displayMembers: string[] | string;
  @Input('keyFiald') keyFiald = 'id';
  @Input('dataService') dataService: DataService<T>;

  @Output('change') change = new EventEmitter();
  @Output('add') add = new EventEmitter();
  @Output('delete') delete = new EventEmitter();
  @Output('refresh') refresh = new EventEmitter();
  @Output('search') search = new EventEmitter();

  items: T[] = [];
  visibleItems: T[];
  isLoaded = false;
  selectedIndex = -1;
  searchFilter = '';

  getItemsSubs: Subscription;
  currentItemsSubs: Subscription;
  deleteItemSubs: Subscription;

  constructor(snackBar: MatSnackBar, dialog: MatDialog) { super(snackBar, dialog); }

  async ngOnInit() {
    const get$ = await this.dataService.get();
    this.getItemsSubs = get$.subscribe((items: T[]) => {
      this.items = items;
      this.dataService.changeCurrentItems(this.items);
      this.isLoaded = true;
    });

    this.currentItemsSubs = this.dataService.currentItems.subscribe(items => {
      this.items = items;
      this.searchItems();
    });
  }

  ngOnDestroy() {
    if (this.getItemsSubs) { this.getItemsSubs.unsubscribe(); }
    if (this.currentItemsSubs) { this.currentItemsSubs.unsubscribe(); }
    if (this.deleteItemSubs) { this.deleteItemSubs.unsubscribe(); }
  }

  getDisplayText(item): string {
    let result = '';
    if (item) {
      if (this.displayMembers) {
        if (this.displayMembers instanceof Array) {
          this.displayMembers.forEach(member => {
            result += (result === '' ? '' : ' - ') + item[member];
          });
        } else {
          result = item[this.displayMembers];
        }
      } else {
        result = item;
      }
    }

    return result;
  }

  searchItems() {
    if (!this.items) { return; }
    const srchFltr = this.searchFilter.toLowerCase();
    this.visibleItems = this.items.filter(r => {
      let result = false;
      if (this.displayMembers) {
        if (this.displayMembers instanceof Array) {
          this.displayMembers.forEach(member => {
            result = result || r[member].toLowerCase().includes(srchFltr);
          });
        } else {
          result = r[this.displayMembers].toLowerCase().includes(srchFltr);
        }
      } else {
        result = r.toString().toLowerCase().includes(srchFltr);
      }

      return result;
    });

    if (this.visibleItems && this.visibleItems.length > 0) {
      this.selectItemByIndex(0);
    } else {
      this.selectItemByIndex(-1);
    }
    this.search.emit(this.visibleItems);
  }

  async refreshItems() {
    console.log('refresh');
    const get$ = await this.dataService.get();
    this.getItemsSubs = get$.subscribe((items: T[]) => {
      this.items = items;
      this.dataService.changeCurrentItems(this.items);
      this.searchItems();
      this.refresh.emit();
    });
  }

  addItem() {
    this.add.emit();
  }

  async deleteItem(item) {
    const dialogSubs = this.showConfirm('Are you sure you want to delete this item?', 'Delete item')
      .subscribe(async result => {
        if (result === 'ok') {
          this.showLoading('Please wait ...');
          const delete$ = await this.dataService.delete(item[this.keyFiald]);
          this.deleteItemSubs = delete$.subscribe(itm => {
            const indx = this.items.indexOf(item);
            this.items.splice(indx, 1);
            this.dataService.changeCurrentItems(this.items);
            this.closeLoading();
            this.showSnackBar('Item deleted successfully.', 'Success');
          }, error => {
            this.closeLoading();
            throw error;
          });
        }
        this.delete.emit(item);
        dialogSubs.unsubscribe();
      });
  }

  selectItemByIndex(index) {
    this.selectedIndex = index;
    const item = this.visibleItems[this.selectedIndex];
    let _item = <T>{};
    if (item) {
      _item = item;
    }

    this.dataService.changeCurrentItem(_item);
    this.change.emit(_item);
  }
}
