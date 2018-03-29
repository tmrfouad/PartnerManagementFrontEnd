import { Component, OnInit } from '@angular/core';

import { ActionType } from '../../models/ActionType';
import { MailContent } from '../../models/MailContent';
import { MailData, MailMessageData, SmtpData } from '../../models/MailData';
import { EmailSenderService } from '../../services/email-sender.service';
import { SummarySharedService } from '../../services/summary-shared.service';
import { EmailSender } from '../../models/EmailSender';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {

  tabIndex = 0;
  reportMail: MailContent = {};
  sendMail: MailData = <MailData>{};
  mailCC: string;
  emailSenderList: EmailSender[];
  actionType: ActionType;
  When: string;
  emailSend: EmailSender;

  constructor(private summarySharedServ: SummarySharedService,
    private emailSender: EmailSenderService) {
    this.sendMail.message = <MailMessageData>{};
    this.sendMail.smtp = <SmtpData>{};
    this.sendMail.message.cc = [];

    summarySharedServ.actionTypeCurrent.subscribe(item => {
      this.actionType = item;
    });
    summarySharedServ.currentMailDetails.subscribe(mailContent => {
      if (mailContent.maildata) {
        if (mailContent.maildata.message) {
          this.sendMail.message = mailContent.maildata.message;
          this.sendMail.message.cc = [];
        }
      }
    });

  }

  async ngOnInit() {
    const mailSender = await this.emailSender.get();
    mailSender.subscribe((item: EmailSender[]) => {
      this.emailSenderList = item;
    });
  }

  onTabIndexChanged(index: number) {
    this.tabIndex = index;
    if (this.tabIndex === 1) {
      this.summarySharedServ.changeSendMailDetails({ mailType: 'reportmail', maildata: this.sendMail });
    } else {
      this.summarySharedServ.changeSendMailDetails({ mailType: 'sendmail', maildata: this.sendMail });
    }
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  // From-Mail Dropdown list in Send Mail
  onSelectMailChange(emailSend: EmailSender) {
    if (emailSend) {
      console.log(emailSend);
      this.sendMail.smtp.userName = emailSend.email;
      this.sendMail.smtp.password = emailSend.password;
    }
  }

  hidden(actionTypes: ActionType[]) {
    if (actionTypes.includes(+this.actionType)) {
      return true;
    } else {
      return false;
    }
  }

  changeItem() {
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  addItem(ccMail) {
    if (ccMail) {
      this.sendMail.message.cc.push(ccMail);
      this.mailCC = '';
    }
  }

  removeMailCC(ccMail) {
    const index = this.sendMail.message.cc.indexOf(ccMail);
    this.sendMail.message.cc.splice(index, 1);
  }

  validate(): boolean {
    if (
      (!this.sendMail.message.to && this.tabIndex === 0) ||
      (!this.sendMail.message.body && this.tabIndex === 0) ||
      (!this.reportMail.from && this.tabIndex === 1) ||
      (!this.reportMail.to && this.tabIndex === 1) ||
      (!this.reportMail.body && this.tabIndex === 1)) {
      return false;
    } else {
      return true;
    }
  }

  addActionSummery(): string {
    let
      mailType = '',
      from = ' ',
      mailBody = '',
      mailTo = '',
      mailCC = '',
      when = '',
      summery: string;

    if (this.reportMail) {
      if (this.reportMail.from) {
        from = 'From:  ' + this.reportMail.from + '\n';
      }

      if (this.When) {
        this.tabIndex === 0 ? mailType = 'Send Mail' + '\n' : mailType = 'Report Mail' + '\n';
        when = 'When:  ' + this.When + '\n';
      }
      if (this.reportMail.to && this.tabIndex === 1) {
        mailTo = 'To:  ' + this.reportMail.to + '\n';
      }

      if (this.reportMail.CC) {
        mailCC = 'CC:  ' + this.reportMail.CC + '\n';
      }

      if (this.reportMail.body) {
        mailBody = 'body:  ' + this.reportMail.body + '\n';
      }
    }
    this.tabIndex === 0 ? summery = mailType + when : summery = mailType + from + mailTo + mailCC + mailBody + when;
    return summery.trim();
  }

}
