import { RfqActionFormComponent } from './RFQ/rfq-action-form/rfq-action-form.component';
import { AcceptService } from './services/accept.service';
import { MailService } from './services/mail.service';
import { OrderService } from './services/order-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { MailSendComponent } from './mail-send/mail-send.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountService } from './services/account.service';
import { RfqService } from './services/rfq.service';
import { LoginComponent } from './login/login.component';
import { RfqListComponent } from './RFQ/rfq-list/rfq-list.component';
import { RfqContainarComponent } from './RFQ/rfq-containar/rfq-containar.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoadingComponent } from './components/loading/loading.component';
import { RfqStatusComponent } from './rfq/rfq-status/rfq-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NetworkService } from './services/network.service';
import { CountryService } from './services/country.service';


@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    MailSendComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RfqActionFormComponent,
    RfqListComponent,
    RfqContainarComponent,
    LoadingComponent,
    RfqStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
    RecaptchaFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'customer', component: CustomerFormComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Rfq', component: RfqContainarComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    RfqService,
    AccountService,
    AcceptService,
    OrderService,
    MailService,
    AuthGuard,
    NetworkService,
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
