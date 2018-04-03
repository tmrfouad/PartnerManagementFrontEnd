import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';
import { RepSharedService } from '../../../services/rep-shared.service';
import { BaseComponent } from '../../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RepFormComponent } from '../rep-form/rep-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-container',
  templateUrl: './rep-container.component.html',
  styleUrls: ['./rep-container.component.css']
})
export class RepContainerComponent extends BaseComponent implements OnInit {

  rep: REP = <REP>{};

  @ViewChild('repForm') repForm: RepFormComponent;

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    public repService: RepService) {

    super(snackBar, dialog);

    repService.currentItem.subscribe((item: REP) => {
      if (item) { this.rep = item; }
    });
  }

  ngOnInit() {
  }

  addrep() {
    this.repForm.isNewRecord = true;
    const rep: REP = <REP>{};
    this.repService.changeCurrentItem(rep);
    this.getElement('name').focus();
  }
}
