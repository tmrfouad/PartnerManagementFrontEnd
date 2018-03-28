import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { EmailSender } from '../../models/EmailSender';
import { EmailSenderService } from '../../services/email-sender.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent extends BaseComponent implements OnInit, OnDestroy {
  //#region Fields
  form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });
  emailSender: EmailSender;
  emailSenders: EmailSender[];
  selectedIndex = 0;
  newRecord = false;

  getSubs: Subscription;
  postSubs: Subscription;
  putSubs: Subscription;
  deleteSubs: Subscription;
  currSendersSubs: Subscription;
  currSenderSubs: Subscription;
  //#endregion

  //#region Form Controls
  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }
  //#endregion

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private emailSenderService: EmailSenderService) {

    super(snackBar, dialog);
    this.emailSender = {};
    this.emailSenderService.changeCurrentSender({});
  }

  async ngOnInit() {
    this.currSendersSubs = this.emailSenderService.currentSenders.subscribe(senders => {
      this.emailSenders = senders;
    });

    this.currSenderSubs = this.emailSenderService.currentSender.subscribe(sender => {
      this.emailSender = sender;
    });

    const get$ = await this.emailSenderService.get();
    this.getSubs = get$.subscribe((senders: EmailSender[]) => {
      this.emailSenders = senders;
      this.emailSenderService.changeCurrentSenders(senders);
      if (senders && senders.length > 0) {
        this.selectedIndex = 0;
        this.selectSender(senders[0]);
        this.emailSenderService.changeCurrentSender(senders[0]);
      }
    });
  }

  ngOnDestroy() {
    if (this.getSubs) { this.getSubs.unsubscribe(); }
    if (this.postSubs) { this.postSubs.unsubscribe(); }
    if (this.putSubs) { this.putSubs.unsubscribe(); }
    if (this.deleteSubs) { this.deleteSubs.unsubscribe(); }
    if (this.currSendersSubs) { this.currSendersSubs.unsubscribe(); }
  }

  newSender() {
    this.newRecord = true;
    this.emailSenderService.changeCurrentSender({});
  }

  async saveSender() {
    this.showLoading();
    if (this.newRecord) {
      const post$ = await this.emailSenderService.post(this.form.value);
      this.postSubs = post$.subscribe((sender: EmailSender) => {
        this.newRecord = false;
        this.emailSender = sender;
        this.emailSenderService.changeCurrentSender(sender);
        this.emailSenders.push(sender);
        this.emailSenderService.changeCurrentSenders(this.emailSenders);
        this.closeLoading();
        this.showSnackBar('Email sender saved successfully.', 'Success');
      }, error => {
        this.closeLoading();
        throw error;
      });
    } else {
      const put$ = await this.emailSenderService.put(this.emailSender.id, this.form.value);
      this.putSubs = put$.subscribe((sender: EmailSender) => {
        this.emailSender = sender;
        this.emailSenderService.changeCurrentSender(sender);
        const indx = this.emailSenders.indexOf(sender);
        this.emailSenders[indx] = sender;
        this.emailSenderService.changeCurrentSenders(this.emailSenders);
        this.closeLoading();
        this.showSnackBar('Email sender updated successfully.', 'Success');
      }, error => {
        this.closeLoading();
        throw error;
      });
    }
  }

  selectSender(sender: EmailSender) {
    const indx = this.emailSenders.indexOf(sender);
    this.selectedIndex = indx;
    this.emailSenderService.changeCurrentSender(sender);
  }

  removeSender(sender: EmailSender) {
    this.showConfirm('Are you sure you want to delete this template ?', 'Delete')
      .subscribe(async result => {
        if (result === 'ok') {
          this.showLoading('Please wait ...');
          const delete$ = await this.emailSenderService.delete(sender.id);
          this.deleteSubs = delete$.subscribe((emailSender: EmailSender) => {
            const indx = this.emailSenders.indexOf(sender);
            this.emailSenders.splice(indx, 1);
            this.emailSenderService.changeCurrentSenders(this.emailSenders);
            this.closeLoading();
            this.showSnackBar('Email sender deleted successfully.', 'Success');
          }, error => {
            this.closeLoading();
            throw error;
          });
        }
      });
  }

  async refreshSenders() {
    const get$ = await this.emailSenderService.get();
    this.getSubs = get$.subscribe((senders: EmailSender[]) => {
      this.emailSenders = senders;
      this.emailSenderService.changeCurrentSenders(senders);
      if (senders && senders.length > 0) {
        this.selectedIndex = 0;
        this.selectSender(senders[0]);
        this.emailSenderService.changeCurrentSender(senders[0]);
      }
    });
  }
}
