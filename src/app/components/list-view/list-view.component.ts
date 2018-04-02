import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/abstracts/data-service.service';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent<T> extends BaseComponent implements OnInit {
  @Input('title') title: string;
  @Input('displayMembers') displayMembers: string[] | string;
  @Input('keyFiald') keyFiald = 'id';
  @Input('dataService') dataService: DataService<T>;

  @Output('add') add = new EventEmitter();
  @Output('change') change = new EventEmitter();

  items: T[] = [];
  visibleItems: T[];
  isLoaded = false;
  selectedIndex = -1;
  searchFilter = '';

  constructor(snackBar: MatSnackBar, dialog: MatDialog) { super(snackBar, dialog); }

  async ngOnInit() {
    const get$ = await this.dataService.get();
    get$.subscribe((items: T[]) => {
      this.items = items;
      this.dataService.changeCurrentItems(this.items);
      this.isLoaded = true;
    });

    this.dataService.currentItems.subscribe(items => {
      this.items = items;
      this.searchItems();
    });
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
  }

  async refreshItems() {
    const get$ = await this.dataService.get();
    get$.subscribe((items: T[]) => {
      this.items = items;
      this.dataService.changeCurrentItems(this.items);
      this.searchItems();
    });
  }

  addItem() {
    this.add.emit();
  }

  async deleteItem(item) {
    this.showConfirm('Are you sure you want to delete this item?', 'Delete item')
      .subscribe(async result => {
        if (result === 'ok') {
          const delete$ = await this.dataService.delete(item[this.keyFiald]);
          delete$.subscribe(itm => {
            const indx = this.items.indexOf(item);
            this.items.splice(indx, 1);
            this.dataService.changeCurrentItems(this.items);
          });
        }
      });
  }

  selectItemByIndex(index) {
    this.selectedIndex = index;
    const item = this.visibleItems[this.selectedIndex];
    if (item) {
      this.dataService.changeCurrentItem(item);
    } else {
      this.dataService.changeCurrentItem(<T>{});
    }
    this.change.emit(item);
  }
}
