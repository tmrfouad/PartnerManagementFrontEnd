import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from '../../services/abstracts/data-service.service';
import { Utilities } from '../../services/utilities';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  @Input('title') title: string;
  @Input('displayMembers') displayMembers: string[] | string;
  @Input('keyFiald') keyFiald = 'id';
  @Input('dataService') dataService: DataService<any>;
  @Input('fieldsNames') fieldsNames: string[] = [];
  @Input('fieldsCaptions') fieldsCaptions: string[] = [];

  currentItem = {};
  currentItems = [];

  currentItemSubs: Subscription;
  currentItemsSubs: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.dataService) {
      this.currentItemSubs = this.dataService.currentItem.subscribe(item => {
        if (item) {
          this.currentItem = item;
        }
      });
    }
  }

  displayField(field: string) {
    if (field.includes('|')) {
      const fldArr = field.split('|');
      const fld = fldArr[0];
      switch (fldArr[1]) {
        case 'date':
          return Utilities.formatDate(new Date(this.currentItem[fld]), 'yyyy-MM-dd hh:mm:ss tt');
        default:
          return this.currentItem[fld];
      }
    } else {
      return this.currentItem[field];
    }
  }

  editItem() {

  }
}
