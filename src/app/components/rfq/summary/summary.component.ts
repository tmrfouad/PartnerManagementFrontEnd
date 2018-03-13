import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionTypeComment } from '../../../models/ActionTypeComment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'summary-info',
  templateUrl: './summary.component.html',
  styleUrls:  ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() {
   }
  @Input('actionType') actionType: ActionTypeComment = <ActionTypeComment>{};
  // tslint:disable-next-line:no-output-on-prefix
  @Output() addSummary = new EventEmitter();

  ngOnInit() {
    this.actionType.attende = [];
  }

  addItem(item: HTMLInputElement) {
    if (item.value) {
      this.actionType.attende.push(item.value);
      this.addSummary.emit(this.addSummery());
      item.value = '';
    }
  }

  changeItem() {
    this.addSummary.emit(this.addSummery());
  }

addSummery(): string {
      let Where = ' ', VisitReason = ' ', comment = ' ', Attended = ' ', summery: string ;
      if (this.actionType.where) {
       Where = ' Where: ' + this.actionType.where ;
      }
      if (this.actionType.visitReason) {
        VisitReason = ' Visit Reason: ' + this.actionType.visitReason ;
      }
      if (this.actionType.comment) {
        comment = ' Comments: ' + this.actionType.comment;
      }
      if (this.actionType.attende.length > 0) {
        Attended = ' Attended: ';
        for (const item of this.actionType.attende) {
          Attended += ' ' + item + ', ';
          }
      }
      summery = Where + VisitReason + comment + Attended;
      summery = summery.substring(0, summery.length - 2 );
      return summery.trim();
  }

  removeItem(item) {
    const index = this.actionType.attende.indexOf(item);
    this.actionType.attende.splice(index, 1);
    this.addSummary.emit(this.addSummery());
  }


}
