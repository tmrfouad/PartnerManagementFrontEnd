import { Component, OnInit } from '@angular/core';

import { ActionType } from '../../models/ActionType';
import { MailContent } from '../../models/MailContent';
import { MailData, MailMessageData, SmtpData } from '../../models/MailData';
import { EmailSenderService } from '../../services/email-sender.service';
import { SummarySharedService } from '../../services/summary-shared.service';
import { EmailSender } from '../../models/EmailSender';
import { EmailTemplateService } from '../../services/email-template.service';
import { EmailTemplate } from '../../models/EmailTemplate';
import { RFQ } from '../../models/RFQ';
import { MatDialog } from '@angular/material';
import { EmailTemplatePreviewComponent } from '../email/email-template-preview/email-template-preview.component';
import { EmailTemplateSharedService } from '../../services/email-template-shared.service';
import { RfqService } from '../../services/rfq.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {


  tabIndex = 0;
  reportMail: MailContent = {};
  sendMail: MailData;

  mailCC: string;
  emailSenderList: EmailSender[];
  emailTempList: EmailTemplate[];
  actionType: ActionType;
  When: string;

  // for dropdownList for each (template) and the (From)
  emailSend: EmailSender;
  emailTemp: EmailTemplate;

  HtmlTemplate: string;
  rfq: RFQ = {};

  constructor(private summarySharedServ: SummarySharedService,
    private sharedService: EmailTemplateSharedService,
    private emailSender: EmailSenderService,
    private rfqShared: RfqService,
    private emailTmpService: EmailTemplateService,
    private dialog: MatDialog) {
    this.sendMail = <MailData>{};
    this.sendMail.message = <MailMessageData>{};
    this.sendMail.smtp = <SmtpData>{};
    this.sendMail.message.cc = [];
    this.sendMail.message.to = [];

    summarySharedServ.actionTypeCurrent.subscribe(item => {
      this.actionType = item;
    });

  }

  async ngOnInit() {

    this.rfqShared.currentItem.subscribe(rfq => {
      this.rfq = rfq;
      if (this.rfq) {
        if (this.sendMail.message.to && this.sendMail.message.to.length === 0) {
          this.sendMail.message.to[0] = this.rfq.contactPersonEmail;
        }
      }
    });

    const mailSender = await this.emailSender.get();
    mailSender.subscribe((item: EmailSender[]) => {
      this.emailSenderList = item;
    });

    const template = await this.emailTmpService.get();
    template.subscribe((item: EmailTemplate[]) => {
      this.emailTempList = item;
    });

  }

  onTabIndexChanged(index: number) {
    this.tabIndex = index;
    if (this.tabIndex === 1) {
      this.updateThMail('reportmail');
    } else {
      this.updateThMail('sendmail');
    }
    this.summarySharedServ.chanageActionSummeryDetails({ summary: this.addActionSummery(), active: this.validate() });
  }

  // From-Mail Dropdown list in Send Mail
  onSelectMailChange(emailSend) {
    const currentUser: EmailSender = this.emailSenderList.filter(x => x.id === +emailSend)[0];
    this.sendMail.smtp.userName = currentUser.email;
    this.sendMail.smtp.password = currentUser.password;
    this.updateThMail('sendmail');
  }

  // From Template-DropdownList in Send Mail
  onSelectTemplateChange(Template) {
    const currentTemplate: EmailTemplate = this.emailTempList.filter(x => x.id === +Template)[0];
    this.sendMail.message.subject = currentTemplate.subject;
    this.sendMail.message.body = this.emailTmpService.buildTempBody(currentTemplate.htmlTemplate, this.rfq);
    this.updateThMail('sendmail');
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
    if (this.tabIndex === 0) {
      this.updateThMail('sendmail');
    }
  }

  addItem(ccMail) {
    if (ccMail) {
      this.sendMail.message.cc.push(ccMail);
      this.mailCC = '';
      this.updateThMail('sendmail');
    }
  }

  removeMailCC(ccMail) {
    const index = this.sendMail.message.cc.indexOf(ccMail);
    this.sendMail.message.cc.splice(index, 1);
    this.updateThMail('sendmail');
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
      mailType = '', from = ' ', mailBody = '',
      mailTo = '', mailCC = '', when = '', summery: string;

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

  previewTemp() {
    if (this.sendMail.message && this.sendMail.message.body) {
      this.dialog.open(EmailTemplatePreviewComponent, {
        position: {
          top: '100px'
        },
        width: '800px',
        height: '500px',
        maxHeight: '500px',
        data: {
          subject: this.sendMail.message.subject,
          htmlTemplate: this.emailTmpService.buildTempBody(this.sendMail.message.body, this.rfq)
        }
      });
    }
  }

  updateThMail(type: string) {
    if (type === 'sendmail') {
      this.summarySharedServ.changeMailContent(
        {
          mailType: 'sendmail',
          mailContent: this.sendMail
        });
    } else {
      this.summarySharedServ.changeMailContent(
        {
          mailType: 'reportmail',
          mailContent: <MailData>{}
        });
    }
  }
}
