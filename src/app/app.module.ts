import { MailService } from './services/mail.service';
import { DataService } from './services/data-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { MailSendComponent } from './mail-send/mail-send.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    MailSendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
    RecaptchaFormsModule,
    HttpModule
  ],
  providers: [
    DataService,
    MailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
