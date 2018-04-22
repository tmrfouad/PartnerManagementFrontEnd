import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailTemplate } from '../../../models/EmailTemplate';
import { EmailTemplateService } from '../../../services/email-template.service';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from '../../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EmailTemplateSharedService } from '../../../services/email-template-shared.service';
import { RFQ } from '../../../models/RFQ';
import { EmailTemplatePreviewComponent } from '../email-template-preview/email-template-preview.component';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent extends BaseComponent implements OnInit, OnDestroy {
  //#region Fields
  form = new FormGroup({
    'subject': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'htmlTemplate': new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  tags = this.emailTmpService.getTags();
  template: EmailTemplate;
  templates: EmailTemplate[];
  // tempSelectedIndex = 0;
  newRecord = false;

  mailPostSubs: Subscription;
  mailPutSubs: Subscription;
  sharedCurrTempsSubs: Subscription;
  sharedCurrTempSubs: Subscription;
  //#endregion

  //#region Form Controls
  get Subject() {
    return this.form.get('subject');
  }
  get HtmlTemplate() {
    return this.form.get('htmlTemplate');
  }
  @ViewChild('htmlTemplateInput') htmlTemplateInput;
  //#endregion

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    public emailTmpService: EmailTemplateService) {

    super(snackBar, dialog);
    this.template = {};
    this.emailTmpService.changeCurrentItem({});
  }

  async ngOnInit() {
    this.sharedCurrTempsSubs = this.emailTmpService.currentItems.subscribe(templates => {
      this.templates = templates;
    });

    this.sharedCurrTempSubs = this.emailTmpService.currentItem.subscribe(template => {
      this.template = template;
    });

    // const getMail$ = await this.emailTmpService.get();
    // this.mailGetSubs = getMail$.subscribe((templates: EmailTemplate[]) => {
    //   this.templates = templates;
    //   this.sharedService.changeCurrentTemps(templates);
    //   if (templates && templates.length > 0) {
    //     this.tempSelectedIndex = 0;
    //     this.selectTemp(templates[0]);
    //     this.sharedService.changeCurrentTemp(templates[0]);
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.mailPostSubs) { this.mailPostSubs.unsubscribe(); }
    if (this.mailPutSubs) { this.mailPutSubs.unsubscribe(); }
    if (this.sharedCurrTempsSubs) { this.sharedCurrTempsSubs.unsubscribe(); }
    if (this.sharedCurrTempSubs) { this.sharedCurrTempSubs.unsubscribe(); }
  }

  addTag(tag) {
    const htmlInput: HTMLInputElement = this.htmlTemplateInput.nativeElement;
    const position = htmlInput.selectionStart;
    const templateText = <string>this.HtmlTemplate.value;
    const insText = `{{ ${tag.key} }}`;
    const outputText = [templateText.slice(0, position), insText, templateText.slice(position)].join('');
    this.HtmlTemplate.setValue(outputText);
    htmlInput.setSelectionRange(position + insText.length, position + insText.length);
    htmlInput.focus();
  }

  onTempChange(temp) {
    this.newRecord = false;
  }

  newTemp() {
    this.newRecord = true;
    this.emailTmpService.changeCurrentItem({});
    this.form.reset();
    this.getReactiveElement('subject').focus();
  }

  async saveTemp() {
    this.showLoading();
    if (this.newRecord) {
      const mailPost$ = await this.emailTmpService.post(this.template);
      this.mailPostSubs = mailPost$.subscribe((mail: EmailTemplate) => {
        this.newRecord = false;
        // this.template = mail;
        // this.emailTmpService.changeCurrentItem(mail);
        this.templates.push(mail);
        this.emailTmpService.changeCurrentItems(this.templates);
        this.closeLoading();
        this.showSnackBar('Email template saved successfully.', 'Success');
      }, error => {
        this.closeLoading();
        throw error;
      });
    } else {
      const mailPut$ = await this.emailTmpService.put(this.template.id, this.template);
      this.mailPutSubs = mailPut$.subscribe((mail: EmailTemplate) => {
        // this.template = mail;
        // this.emailTmpService.changeCurrentItem(mail);
        // const indx = this.templates.indexOf(mail);
        // this.templates[indx] = mail;
        // this.emailTmpService.changeCurrentItems(this.templates);
        this.closeLoading();
        this.showSnackBar('Email template updated successfully.', 'Success');
      }, error => {
        this.closeLoading();
        throw error;
      });
    }
  }

  previewTemp() {
    if (this.template) {
      const rfq = {
        address: 'Cairo - Egypt',
        companyArabicName: 'الشركة العربية لخدمات الحاسبات',
        companyEnglishName: 'Arabian Co. for Computer Services (ACS)',
        contactPersonArabicName: 'تامر فؤاد',
        contactPersonEmail: 'tabuhmead@acs-me.com',
        contactPersonEnglishName: 'Tamer Fouad',
        contactPersonMobile: '+201002363512',
        contactPersonPosition: 'Sr. Developer',
        location: 'Cairo',
        phoneNumber: '+233655478',
        rfqCode: 1112212,
        rfqId: 1,
        selectedEditionId: 1,
        sendEmail: false,
        status: 1,
        submissionTime: new Date(),
        targetedProductId: 1,
        universalIP: '1.1.1.1',
        website: 'www.acs-me.com'
      };
      // const tempBody = this.buildTempBody(rfq);
      this.dialog.open(EmailTemplatePreviewComponent, {
        position: {
          top: '100px'
        },
        width: '800px',
        height: '500px',
        maxHeight: '500px',
        data: {
          subject: this.template.subject,
          htmlTemplate: this.emailTmpService.buildTempBody(this.HtmlTemplate.value, rfq)
        }
      });
    }
  }
}
