import { Component, EventEmitter, OnInit, Output, Input, OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';
import { BaseComponent } from '../../base-component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { RepSharedService } from '../../../services/rep-shared.service';

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

  constructor(
    private repService: RepService,
    private repSharService: RepSharedService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
      super(snackBar, dialog);
    repSharService.currentRepListService.subscribe(repList => this.repList = repList);
  }

  async ngOnInit() {
    this.refreshRep();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectedRep(rep: REP, i: number) {
    this.selectedIndex = i;
    this.repSharService.changeRep(rep);
  }



  addrep() {
    this.selectedIndex = -1;
    const rep: REP = <REP>{};
    this.repSharService.changeRep(rep);
  }

  async refreshRep() {
    this.rep$ = await this.repService.get();
    this.subscription = this.rep$.subscribe((item: REP[]) => {
      this.repList = item;
      if (this.repList.length > 0) {
        this.repSharService.changeRep(this.repList[0]);
        this.repSharService.changeRepList(this.repList);
        this.selectedIndex = 0;
      }
    });

  }

  removeRep(item: REP) {
    this.showConfirm(`Are you sure you want to delete this Represintitive( ${item.name} )?`, 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.repService.delete(item.id);
        del.subscribe(() => {
          this.refreshRep();
        });
      }
    });
  }
}
