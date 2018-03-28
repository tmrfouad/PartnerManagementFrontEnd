import { SummarySharedService } from './../../../services/summary-shared.service';
import { ActionType } from './../../../models/ActionType';
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

  // for angular editor error in html only => set it in ngModel in attend textBox
  attend: string;
  tabIndex = 0;
  summaryInfo: ActionTypeComment = {};
  summaryDetails: SummaryDetails;
  actionType: ActionType;

  constructor(private summarySharedServ: SummarySharedService) {
    summarySharedServ.actionTypeCurrent.subscribe(item => {
      this.actionType = item;
      this.summaryInfo = {};
      this.summaryInfo.attendee = [];
    });
  }

  hidden(actionTypes: ActionType[]) {
    if (actionTypes.includes(+this.actionType)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
  }

  validate(): boolean {
    if (this.summaryInfo) {
      if ((this.summaryInfo.attendee && this.summaryInfo.attendee.length === 0 && ![5, 4].includes(+this.actionType)) ||
        !this.summaryInfo.actionWhen ||
        (!this.summaryInfo.where && ![5, 4].includes(+this.actionType))) {
        return false;
      } else {
        return true;
      }
    }
  }

  addItem(item) {
    if (item) {
      this.summaryInfo.attendee.push(item);
      this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
      this.attend = '';
    }
  }

  changeItem() {
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  onTabIndexChanged(index: number) {
    this.tabIndex = index;
  }

  addActionSummery(): string {
    let where = ' ', visitReason = '', requiredAction = '', comment = '', attended = '', when = '', callSummary = '', summery: string;
    if (this.summaryInfo.where) {
      where = 'Where: ' + this.summaryInfo.where + '\n';
    }
    if (this.summaryInfo.requiredActions) {
      requiredAction = 'Required Action: ' + this.summaryInfo.requiredActions + '\n';
    }
    if (this.summaryInfo.visitReason) {
      visitReason = 'Visit Reason: ' + this.summaryInfo.visitReason + '\n';
    }
    if (this.summaryInfo.comment) {
      comment = 'Comments: ' + this.summaryInfo.comment + '\n';
    }
    if (this.summaryInfo.actionWhen) {
      when = 'When: ' + this.summaryInfo.actionWhen + '\n';
    }

    if (this.summaryInfo.callSummary) {
      callSummary = 'Call Summary: ' + this.summaryInfo.callSummary + '\n';
    }

    if (this.summaryInfo.attendee && this.summaryInfo.attendee.length > 0) {
      attended = 'Attended: ' + '\n';
      for (const item of this.summaryInfo.attendee) {
        attended += item + '\n';
      }
    }

    summery = where + attended + visitReason + when + requiredAction + comment + callSummary;
    return summery.trim();
  }

  removeItem(item) {
    const index = this.summaryInfo.attendee.indexOf(item);
    this.summaryInfo.attendee.splice(index, 1);
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  checkLength(): boolean {
    if (this.summaryInfo.attendee) {
      if (this.summaryInfo.attendee.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  }

}
