import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls:  ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() {
   }
  @Input('actionType') actionType = {
    attende: [],
    where: '',
    visitReason: '',
    comment: '',
  };

  ngOnInit() {
  }

  addItem(item) {
    this.actionType.attende.push(item);
  }

  removeItem(item) {
    const index = this.actionType.attende.indexOf(item);
    this.actionType.attende.splice(index, 1);
  }

}
