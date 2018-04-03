import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { RepSharedService } from '../../../services/rep-shared.service';
import { REP } from './../../../models/REP';
import { RepService } from './../../../services/rep.service';
import { BaseComponent } from './../../base-component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-form',
  templateUrl: './rep-form.component.html',
  styleUrls: ['./rep-form.component.css']
})
export class RepFormComponent extends BaseComponent implements OnInit {

  repList: REP[];
  rep: REP = <REP>{};

  isNewRecord;

  constructor(private repService: RepService,
    private router: Router,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    repService.currentItem.subscribe((item: REP) => {
      if (item) {
        this.rep = item;
      }
    });
    repService.currentItems.subscribe(repList => this.repList = repList);
  }

  ngOnInit() {
  }

  async submitForm(item: REP) {
    // Edit The Rep
    if (!this.isNewRecord) {
      this.showLoading('Loading');
      const rep$ = await this.repService.put(item.id, item);
      rep$.subscribe((currentRep: REP) => {
        this.closeLoading();
        this.showSnackBar('Representative edited successfully', 'Success');
        // const i = this.repList.indexOf(this.rep);
        // this.repList[i] = currentRep;
        // this.repService.changeCurrentItems(this.repList);
      }, error => {
        this.closeLoading();
        throw error;
      });
    } else {
      // Adding new rep
      this.showLoading('Loading');
      const rep$ = await this.repService.post(item);
      rep$.subscribe((rep: REP) => {
        this.closeLoading();
        this.showSnackBar('Representative added successfully', 'Success');
        this.repList.push(rep);
        this.repService.changeCurrentItems(this.repList);
        this.isNewRecord = false;
      }, error => {
        this.closeLoading();
        throw error;
      });
    }
  }

  repListViewChange(item) {
    this.isNewRecord = false;
  }

}
