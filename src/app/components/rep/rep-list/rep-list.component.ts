import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';
import { BaseComponent } from '../../base-component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-list',
  templateUrl: './rep-list.component.html',
  styleUrls: ['./rep-list.component.css']
})
export class RepListComponent extends BaseComponent implements OnInit, OnDestroy {

  rep$: Observable<{}>;
  repList: REP[] = [];
  currentRep: REP = <REP>{};
  subscription: Subscription;
  selectedIndex = 0;
  // tslint:disable-next-line:no-output-on-prefix
  // tslint:disable-next-line:no-output-rename
  @Output('submitREP') submitREP = new EventEmitter();
  @Input('RepItem') RepItem;

  private _reload: string;
  get reload(): string {
    return this._reload;
  }

  @Input('reload') set reload(value: string) {
    this._reload = value;
    if (value === 'reload') {
      this.refreshRep();
    }
  }

  constructor(
    private repService: RepService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(snackBar, dialog);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.refreshRep();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectedRep(rep: REP, i: number) {
    this.selectedIndex = i;
    this.submitREP.emit(rep);
  }

  addrep() {
    this.selectedIndex = -1;
    const rep: REP = <REP>{};
    this.submitREP.emit(rep);
  }

  async refreshRep() {
    this.rep$ = await this.repService.get();
    this.subscription = this.rep$.subscribe((item: REP[]) => {
      this.repList = item;
      if (this.repList.length > 0) {
        this.RepItem = this.repList[0];
        this.selectedIndex = 0;
        this.submitREP.emit(this.RepItem);
      }
    });
  }

  async removeRep(id) {
    this.showConfirm('Are you sure you want to delete this Represintitive?', 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.repService.delete(id);
        del.subscribe(() => {
          this.refreshRep();
        });
      }
    });
  }
}
