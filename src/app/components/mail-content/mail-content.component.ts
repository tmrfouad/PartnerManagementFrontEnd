import { Component, OnInit } from '@angular/core';
import { ActionType } from '../../models/ActionType';
import { SummarySharedService } from '../../services/summary-shared.service';
import { MailContent } from '../../models/MailContent';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {

  tabIndex = 0;
  mailInfo: MailContent = {};
  mailCC: string;
  actionType: ActionType;
  actionWhen: string;
  constructor(private summarySharedServ: SummarySharedService) {
    summarySharedServ.actionTypeCurrent.subscribe(item => {
      this.actionType = item;
      this.mailInfo.sendMailCC = [];
    });
  }

  ngOnInit() {
  }

  onTabIndexChanged(index: number) {
    this.tabIndex = index;
    this.mailInfo = {};
    this.tabIndex === 0 ? this.mailInfo.sendMailCC = [] : this.mailInfo.sendMailCC = null;
    if (this.tabIndex === 0) {
      this.summarySharedServ.changeSendMailDetails(this.mailInfo);
    } else {
      this.summarySharedServ.changeSendMailDetails({});
    }
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: false });
  }

  hidden(actionTypes: ActionType[]) {
    if (actionTypes.includes(+this.actionType)) {
      return true;
    } else {
      return false;
    }
  }

  changeItem() {
    if (this.tabIndex === 0) {
      this.summarySharedServ.changeSendMailDetails(this.mailInfo);
    } else {
      this.summarySharedServ.changeSendMailDetails({});
    }
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  addItem(ccMail) {
    if (ccMail) {
      this.mailInfo.sendMailCC.push(ccMail);
      this.mailCC = '';
    }
  }

  removeMailCC(ccMail) {
    const index = this.mailInfo.sendMailCC.indexOf(ccMail);
    this.mailInfo.sendMailCC.splice(index, 1);
  }

  validate(): boolean {
    if (this.mailInfo) {
      if ((!this.mailInfo.from) ||
        (!this.mailInfo.to) ||
        (!this.mailInfo.When) ||
        (!this.mailInfo.body && (this.tabIndex === 1)) ||
        (!this.mailInfo.template && (this.tabIndex === 0))) {
        return false;
      } else {
        return true;
      }
    }
  }

  addActionSummery(): string {
    let mailType = '',
      from = ' ',
      mailBody = '',
      mailTo = '',
      mailCC = '',
      when = '',
      summery: string;

    if (this.mailInfo) {
      if (this.mailInfo.from && this.tabIndex === 1) {
        from = 'From:  ' + this.mailInfo.from + '\n';
      }

      if (this.mailInfo.When) {
        this.tabIndex === 0 ? mailType = 'Send Mail' + '\n' : mailType = 'Report Mail' + '\n';
        when = 'When:  ' + this.mailInfo.When + '\n';
      }
      if (this.mailInfo.to && this.tabIndex === 1) {
        mailTo = 'To:  ' + this.mailInfo.to + '\n';
      }

      if (this.mailInfo.reportCC && this.mailInfo.reportCC.length > 0 && this.tabIndex === 1) {
        mailCC = 'CC:  ' + this.mailInfo.reportCC + '\n';
      }

      if (this.mailInfo.body && this.tabIndex === 1) {
        mailBody = 'body:  ' + this.mailInfo.body + '\n';
      }
    }

    summery = mailType + from + mailTo + mailCC + mailBody + when;
    return summery.trim();
  }

}
