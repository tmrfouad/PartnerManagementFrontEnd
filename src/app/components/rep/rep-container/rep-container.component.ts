import { Component, OnInit, Input } from '@angular/core';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';

@Component({
  selector: 'app-rep-container',
  templateUrl: './rep-container.component.html',
  styleUrls: ['./rep-container.component.css']
})
export class RepContainerComponent implements OnInit {

  rep: REP = <REP>{};
  status = 'new';
  constructor(private repService: RepService) {
  }

  ngOnInit() {
  }

  selectRep(rep: REP) {
    this.rep = rep;
    if (this.rep) {
      if (Object.keys(this.rep).length > 0) {
        this.status = 'edit';
      } else {
        this.status = 'new';
      }
    }
  }

  refreshList(rep: REP) {
    this.rep = rep;
  }
}
