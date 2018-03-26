import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionTypeComment } from '../../../models/ActionTypeComment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'summary-info',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() {
  }

  @Input('actionType') actionType: ActionTypeComment = <ActionTypeComment>{};
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

    let Where = '', VisitReason = '', comment = '', Attended = '', when = '', summery: string;
    if (this.actionType.where) {
      Where = 'Where: ' + this.actionType.where + '\n';
    }
    if (this.actionType.visitReason) {
      VisitReason = 'Visit Reason: ' + this.actionType.visitReason + '\n';
    }
    if (this.actionType.comment) {
      comment = 'Comments: ' + this.actionType.comment + '\n';
    }
    if (this.actionType.actionWhen) {
      when = 'When: ' + this.actionType.actionWhen + '\n';
    }
    if (this.actionType.attende.length > 0) {
      Attended = 'Attended: ' + '\n';
      for (const item of this.actionType.attende) {
        Attended += item + '\n';
      }
    }
    summery = Where + Attended + VisitReason + when + comment;
    // summery = summery.substring(0, summery.length - 2);
    return summery.trim();
  }

  removeItem(item) {
    const index = this.actionType.attende.indexOf(item);
    this.actionType.attende.splice(index, 1);
    this.addSummary.emit(this.addSummery());
  }


}
