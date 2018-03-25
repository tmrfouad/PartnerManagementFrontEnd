import { Component, OnInit, Input } from '@angular/core';

import { REP } from '../../../models/REP';
import { RepService } from '../../../services/rep.service';
import { RepSharedService } from '../../../services/rep-shared.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rep-container',
  templateUrl: './rep-container.component.html',
  styleUrls: ['./rep-container.component.css']
})
export class RepContainerComponent implements OnInit {

  rep: REP = <REP>{};

  constructor(private repService: RepService, repShaService: RepSharedService) {
    repShaService.currentrep.subscribe((item: REP) => {
      if (item) { this.rep = item; }
    });
  }

  ngOnInit() {
  }

}
