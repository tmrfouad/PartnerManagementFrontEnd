import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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

  // tslint:disable-next-line:no-input-rename
  private _rep: REP;
  get rep(): REP {
    return this._rep;
  }
  @Input('RepItem') set rep(value: REP) {
    this._rep = value;
    if (this._rep) {
      this.currentRep = Object.assign({}, this.rep);
    }
  }

  @Input('status') status: string;
  @Output('reload') reload = new EventEmitter();

  currentRep: REP = <REP>{};

  constructor(private reService: RepService,
    private router: Router,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    this.status = 'new';
  }

  ngOnInit() {
  }

  async submitForm(item: REP) {
    if (this.status === 'new') {
      this.showLoading('Loading');
      const rep$ = await this.reService.post(item);
      await rep$.toPromise().then((rep: REP) => {
        this.reload.emit('reload');
        this.closeLoading();
        this.showSnackBar('Representative added successfully', 'Success');
        this.rep = Object.assign(this.rep, rep);
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else {
      this.showLoading('Loading');
      const rep$ = await this.reService.put(item.id, item);
      await rep$.toPromise().then((currentRep: REP) => {
        this.closeLoading();
        this.showSnackBar('Representative edited successfully', 'Success');
        this.rep = Object.assign(this.rep, currentRep);
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
  }

}
