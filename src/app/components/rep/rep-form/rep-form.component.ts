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
  currentRep: REP = <REP>{};

  constructor(private reService: RepService,
    private repSharService: RepSharedService,
    private router: Router,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    repSharService.currentrep.subscribe((item: REP) => {
      this.rep = item;
      if (item && Object.keys(item).length > 0) {
        this.currentRep = Object.assign(this.currentRep, item);
      } else {
        this.currentRep = <REP>{};
      }
    });
    repSharService.currentRepListService.subscribe(repList => this.repList = repList);
  }

  ngOnInit() {
  }

  async submitForm(item: REP) {
    // Edit The Rep
    if (this.rep && Object.keys(this.rep).length > 0) {
      this.showLoading('Loading');
      const rep$ = await this.reService.put(item.id, item);
      await rep$.toPromise().then((currentRep: REP) => {
        this.closeLoading();
        this.showSnackBar('Representative edited successfully', 'Success');
        this.rep = Object.assign(this.rep, currentRep);
        this.repSharService.changeRep(this.rep);
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else {
      // Adding new rep
      this.showLoading('Loading');
      const rep$ = await this.reService.post(item);
      await rep$.toPromise().then((rep: REP) => {
        this.rep = Object.assign(this.rep, rep);
        this.repSharService.changeRep(this.rep);
        this.repList.push(item);
        this.repSharService.changeRepList(this.repList);
        this.closeLoading();
        this.showSnackBar('Representative added successfully', 'Success');
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
  }

}
