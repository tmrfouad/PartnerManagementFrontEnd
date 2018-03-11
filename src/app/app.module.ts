import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AppComponent } from './app.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RfqActionFormComponent } from './components/rfq/rfq-action-form/rfq-action-form.component';
import { RfqContainarComponent } from './components/rfq/rfq-containar/rfq-containar.component';
import { RfqEditFormComponent } from './components/rfq/rfq-edit-form/rfq-edit-form.component';
import { RfqListComponent } from './components/rfq/rfq-list/rfq-list.component';
import { RfqStatusListComponent } from './components/rfq/rfq-status-list/rfq-status-list.component';
import { RfqStatusComponent } from './components/rfq/rfq-status/rfq-status.component';
import { StatusEditFormComponent } from './components/rfq/status-edit-form/status-edit-form.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AcceptService } from './services/accept.service';
import { AccountService } from './services/account.service';
import { AuthGuard } from './services/auth-guard.service';
import { CountryService } from './services/country.service';
import { MailService } from './services/mail.service';
import { NetworkService } from './services/network.service';
import { RfqService } from './services/rfq.service';
import { SummaryComponent } from './components/rfq/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RfqActionFormComponent,
    RfqListComponent,
    RfqContainarComponent,
    LoadingComponent,
    RfqStatusComponent,
    RfqStatusListComponent,
    RfqEditFormComponent,
    StatusEditFormComponent,
    SubscribeComponent,
    SummaryComponent
  ],
  imports: [
    MatSnackBarModule,
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
      { path: 'subscribe/:bundle', component: SubscribeComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'login', component: LoginComponent },
      { path: 'Rfq', component: RfqContainarComponent, canActivate: [AuthGuard] }
    ])
  ],
  entryComponents: [
    CustomerFormComponent,
    RfqEditFormComponent,
    LoadingComponent,
    StatusEditFormComponent
  ],
  providers: [
    RfqService,
    AccountService,
    AcceptService,
    MailService,
    AuthGuard,
    NetworkService,
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
