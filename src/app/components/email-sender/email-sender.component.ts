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

  postSubs: Subscription;
  putSubs: Subscription;
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
    public emailSenderService: EmailSenderService) {

    super(snackBar, dialog);
    this.emailSender = {};
    this.emailSenderService.changeCurrentItem({});
  }

  async ngOnInit() {
    this.currSendersSubs = this.emailSenderService.currentItems.subscribe(senders => {
      this.emailSenders = senders;
    });

    this.currSenderSubs = this.emailSenderService.currentItem.subscribe(sender => {
      this.emailSender = sender;
    });
  }

  ngOnDestroy() {
    if (this.postSubs) { this.postSubs.unsubscribe(); }
    if (this.putSubs) { this.putSubs.unsubscribe(); }
    if (this.currSendersSubs) { this.currSendersSubs.unsubscribe(); }
  }

  newSender() {
    this.newRecord = true;
    this.emailSenderService.changeCurrentItem({});
    this.form.reset();
    this.getReactiveElement('email').focus();
  }

  async saveSender() {
    this.showLoading();
    if (this.newRecord) {
      const post$ = await this.emailSenderService.post(this.form.value);
      this.postSubs = post$.subscribe((sender: EmailSender) => {
        this.newRecord = false;
        // this.emailSender = sender;
        // this.emailSenderService.changeCurrentItem(sender);
        this.emailSenders.push(sender);
        this.emailSenderService.changeCurrentItems(this.emailSenders);
        this.closeLoading();
        this.showSnackBar('Email sender saved successfully.', 'Success');
      }, error => {
        this.closeLoading();
        throw error;
      });
    } else {
      const put$ = await this.emailSenderService.put(this.emailSender.id, this.form.value);
      this.putSubs = put$.subscribe((sender: EmailSender) => {
        // const indx = this.emailSenders.indexOf(this.emailSender);
        // this.emailSenders.splice(indx, 1, sender);
        // console.log(indx);
        // console.log(this.emailSender);
        // console.log(this.emailSenders[indx]);
        // this.emailSenderService.changeCurrentItems(this.emailSenders);
        this.showSnackBar('Email sender updated successfully.', 'Success');
        this.closeLoading();
      }, error => {
        this.closeLoading();
        throw error;
      });
    }
  }
}
