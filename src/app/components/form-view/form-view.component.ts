import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../services/abstracts/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent<T> implements OnInit {
  @Input('title') title: string;
  @Input('displayMembers') displayMembers: string[] | string;
  @Input('keyFiald') keyFiald = 'id';
  @Input('dataService') dataService: DataService<T>;
  @Input('fieldsNames') fieldsNames: string[] = [];
  @Input('fieldsCaptions') fieldsCaptions: string[] = [];

  currentItem: T = <T>{};
  currentItems: T[] = [];

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
}
