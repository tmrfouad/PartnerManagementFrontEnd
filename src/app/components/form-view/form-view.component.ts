import { Component, Input, OnInit } from '@angular/core';

import { DataService } from '../../services/abstracts/data-service.service';
import { Subscription } from 'rxjs/Subscription';

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

    const date = new Date('2018-4-5 16:5:4');
    console.log(this.formatDate(date));
    console.log(this.formatDate(date, 'MM)yyyy)dd hh(mm(ss'));
  }

  typeOf(obj, type: string): boolean {
    return typeof obj === type;
  }

  getType(obj) {
    return new Date('dfbgdfg 2015');
    // return typeof obj;
  }

  displayField(field: string) {
    if (field.includes('|')) {
      const fldArr = field.split('|');
      const fld = fldArr[0];
      switch (fldArr[1]) {
        case 'date':
          return this.formatDate(new Date(this.currentItem[fld]), 'yyyy-MM-dd hh:mm:ss');
        default:
          return this.currentItem[fld];
      }
    } else {
      return this.currentItem[field];
    }
  }

  formatDate(date: Date, format?: string): string {
    const day = date.getDate();
    const dd = (day < 10 ? '0' : '') + day.toString();
    const d = day.toString();

    const month = date.getMonth() + 1;
    const MM = (month < 10 ? '0' : '') + month.toString();
    const M = month.toString();

    const year = date.getFullYear();
    const yy = year.toString().substring(2);
    const yyyy = year.toString();

    const hours = date.getHours();
    const hours12 = hours > 12 ? hours - 12 : hours;
    const HH = (hours < 10 ? '0' : '') + hours.toString();
    const H = hours.toString();
    const hh = (hours12 < 10 ? '0' : '') + hours12.toString();
    const h = hours12.toString();

    const minutes = date.getMinutes();
    const mm = (minutes < 10 ? '0' : '') + minutes.toString();
    const m = minutes.toString();

    const seconds = date.getSeconds();
    const ss = (seconds < 10 ? '0' : '') + seconds.toString();
    const s = seconds.toString();

    const milliseconds = date.getMilliseconds();
    const ms = milliseconds.toString();

    const tt = hours >= 12 ? 'PM' : 'AM';

    let result = '';
    if (format) {
      result = format;
      result = result.replace('yyyy', yyyy);
      result = result.replace('yy', yy);
      result = result.replace('MM', MM);
      result = result.replace('M', M);
      result = result.replace('dd', dd);
      result = result.replace('d', d);
      result = result.replace('HH', HH);
      result = result.replace('H', H);
      result = result.replace('hh', hh);
      result = result.replace('h', h);
      result = result.replace('mm', mm);
      result = result.replace('m', m);
      result = result.replace('ss', ss);
      result = result.replace('s', s);
      result = result.replace('ms', ms);
      if (format.includes('h') || format.includes('hh')) {
        result += ' ' + tt;
      }
    } else {
      result = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return result;
  }
}
