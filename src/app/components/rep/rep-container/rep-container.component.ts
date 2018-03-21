import { Component, OnInit, Input } from '@angular/core';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-container',
  templateUrl: './rep-container.component.html',
  styleUrls: ['./rep-container.component.css']
})
export class RepContainerComponent implements OnInit {

  rep: REP = <REP>{};
  reload: string;
  status = 'new';
  constructor(private repService: RepService) {
  }

  ngOnInit() {

  }

  selectRep(rep: REP) {
    this.rep = rep;
    this.reload = '';
    if (this.rep) {
      if (Object.keys(this.rep).length > 0) {
        this.status = 'edit';
      } else {
        this.status = 'new';
      }
    }
  }

  reloadList(item: string) {
    this.reload = item.trim();
  }
}
