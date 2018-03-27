import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionTypeComment } from '../../../models/ActionTypeComment';
import { SummaryDetails } from '../../../models/SummaryDetails';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'summary-info',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input('actionType') actionType: ActionTypeComment = <ActionTypeComment>{};
  @Output() addSummary = new EventEmitter<SummaryDetails>();

  // for angular editor error in html only => set it in ngModel in attend textBox
  attend: string;

  constructor() {
  }


  ngOnInit() {
    this.actionType.attende = [];
  }

  validate(): boolean {
    if (this.actionType.attende.length === 0 || !this.actionType.actionWhen || !this.actionType.where) {
      return false;
    } else {
      return true;
    }

  }

  addItem(item) {
    if (item) {
      this.actionType.attende.push(item);
      this.addSummary.emit({ summary: this.addActionSummery(), active: this.validate() });
      this.attend = '';
    }
  }

  changeItem() {
    this.addSummary.emit({ summary: this.addActionSummery(), active: this.validate() });
  }


  addActionSummery(): string {
    let where = ' ', visitReason = '', requiredAction = '', comment = '', attended = '', when = '', summery: string;
    if (this.actionType.where) {
      where = 'Where: ' + this.actionType.where + '\n';
    }
    if (this.actionType.requiredActions) {
      requiredAction = 'Required Action: ' + this.actionType.requiredActions + '\n';
    }
    if (this.actionType.visitReason) {
      visitReason = 'Visit Reason: ' + this.actionType.visitReason + '\n';
    }
    if (this.actionType.comment) {
      comment = 'Comments: ' + this.actionType.comment + '\n';
    }
    if (this.actionType.actionWhen) {
      when = 'When: ' + this.actionType.actionWhen + '\n';
    }
    if (this.actionType.attende.length > 0) {
      attended = 'Attended: ' + '\n';
      for (const item of this.actionType.attende) {
        attended += item + '\n';
      }
    }
    summery = where + attended + visitReason + when + requiredAction + comment;
    return summery.trim();
  }

  removeItem(item) {
    const index = this.actionType.attende.indexOf(item);
    this.actionType.attende.splice(index, 1);
    this.addSummary.emit({ summary: this.addActionSummery(), active: this.validate() });
  }

  checkLength(): boolean {
    if (this.actionType.attende.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
