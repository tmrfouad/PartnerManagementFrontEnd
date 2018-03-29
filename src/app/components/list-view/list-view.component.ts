import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { Observable } from 'rxjs/Observable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Input('title') title: string;
  @Input('displayMembers') displayMembers: string[] | string;
  @Input('dataService') dataService;

  @Output('refresh') refresh = new EventEmitter();
  @Output('add') add = new EventEmitter();
  @Output('delete') delete = new EventEmitter();
  @Output('change') change = new EventEmitter();

  items: any[] = [];
  visibleItems: any[];
  isLoaded = false;
  selectedIndex = -1;
  searchFilter = '';

  constructor() { }

  async ngOnInit() {
    const get$ = await this.dataService.get() as Observable<any[]>;
    get$.subscribe(items => {
      this.items = items;
      this.searchItems();
      this.isLoaded = true;
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
      let res = '';
      if (this.displayMembers) {
        if (this.displayMembers instanceof Array) {
          this.displayMembers.forEach(member => {
            res = res + (res === '' ? '' : ' || ') + `${r[member]}.toLowerCase().includes(${srchFltr})`;
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
  }

  refreshItems() {
    this.refresh.emit();
  }

  addItem() {
    this.add.emit();
  }

  deleteItem(item) {
    this.delete.emit(item);
  }

  selectItem(item) {
    this.change.emit(item);
  }
}
