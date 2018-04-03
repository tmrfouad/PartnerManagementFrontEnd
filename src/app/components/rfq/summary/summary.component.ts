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
  summaryOptions: SummaryDetails;
  actionType: ActionType;
  meetingTypes: { key: string, name: string }[] =
    [{ key: '0', name: 'On site' }, { key: '1', name: 'Web conference' }];
  meeting_Types: { [key: string]: string } =
    { '0': 'On site', '1': 'Web conference' };
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
      if ((this.summaryInfo.attendee && this.summaryInfo.attendee.length === 0 &&
         [ActionType.Visit, ActionType.PhoneCall].includes(+this.actionType)) ||
        !this.summaryInfo.actionWhen ||
        (!this.summaryInfo.where && [ActionType.Meeting].includes(+this.actionType) && +this.summaryInfo.meetingType === 0) ||
        (!this.summaryInfo.meetingType && [ActionType.Meeting].includes(+this.actionType))) {
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
    let where = ' ', visitReason = '', requiredAction = '', comment = '', attended = '',
      when = '', callSummary = '', meetingType = '', minOfMeeting = '', summery: string;
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

    if (this.summaryInfo.meetingType) {
      meetingType = 'Meeting Type: ' + this.meeting_Types[this.summaryInfo.meetingType] + '\n';
    }

    if (this.summaryInfo.minOfMeeting) {
      minOfMeeting = 'Minutes of Meeting: ' + this.summaryInfo.minOfMeeting + '\n';
    }

    summery = meetingType + where + attended + minOfMeeting +
      visitReason + when + requiredAction +
      comment + callSummary;
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
