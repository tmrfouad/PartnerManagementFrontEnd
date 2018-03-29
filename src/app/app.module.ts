import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';

import { AppComponent } from './app.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EmailSenderComponent } from './components/email-sender/email-sender.component';
import { EmailTemplatePreviewComponent } from './components/email/email-template-preview/email-template-preview.component';
import { EmailTemplateComponent } from './components/email/email-template/email-template.component';
import { HomeComponent } from './components/home/home.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { MailContentComponent } from './components/mail-content/mail-content.component';
import { MessageComponent } from './components/message/message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductContainerComponent } from './components/product/product-container/product-container.component';
import { ProductEditionFormComponent } from './components/product/product-edition-form/product-edition-form.component';
import { ProductEditionListComponent } from './components/product/product-edition-list/product-edition-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { RepContainerComponent } from './components/rep/rep-container/rep-container.component';
import { RepFormComponent } from './components/rep/rep-form/rep-form.component';
import { RepListComponent } from './components/rep/rep-list/rep-list.component';
import { RfqActionFormComponent } from './components/rfq/rfq-action-form/rfq-action-form.component';
import { RfqContainarComponent } from './components/rfq/rfq-containar/rfq-containar.component';
import { RfqEditFormComponent } from './components/rfq/rfq-edit-form/rfq-edit-form.component';
import { RfqListComponent } from './components/rfq/rfq-list/rfq-list.component';
import { RfqStatusListComponent } from './components/rfq/rfq-status-list/rfq-status-list.component';
import { RfqStatusComponent } from './components/rfq/rfq-status/rfq-status.component';
import { StatusEditFormComponent } from './components/rfq/status-edit-form/status-edit-form.component';
import { SummaryComponent } from './components/rfq/summary/summary.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AcceptService } from './services/accept.service';
import { AccountService } from './services/account.service';
import { ActionTypeService } from './services/action-type.service';
import { AuthGuard } from './services/auth-guard.service';
import { CountryService } from './services/country.service';
import { CutomErrorHandler } from './services/custom-error-handler';
import { EmailSenderService } from './services/email-sender.service';
import { EmailTemplateSharedService } from './services/email-template-shared.service';
import { EmailTemplateService } from './services/email-template.service';
import { NetworkService } from './services/network.service';
import { ProductSharedService } from './services/product-shared.service';
import { ProductService } from './services/product.service';
import { RepSharedService } from './services/rep-shared.service';
import { RepService } from './services/rep.service';
import { RfqSharedService } from './services/rfq-shared.service';
import { RfqService } from './services/rfq.service';
import { StatusService } from './services/status.service';
import { SummarySharedService } from './services/summary-shared.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
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
    ConfirmComponent,
    MessageComponent,
    SummaryComponent,
    RepFormComponent,
    RepListComponent,
    RepContainerComponent,
    ProductListComponent,
    ProductContainerComponent,
    ProductFormComponent,
    ProductEditionFormComponent,
    ProductEditionListComponent,
    ListViewComponent,
    NotFoundComponent,
    MailContentComponent,
    EmailTemplateComponent,
    EmailTemplatePreviewComponent,
    EmailSenderComponent
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
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductContainerComponent, canActivate: [AuthGuard] },
      { path: 'rep', component: RepContainerComponent, canActivate: [AuthGuard] },
      { path: 'Rfq', component: RfqContainarComponent, canActivate: [AuthGuard] },
      { path: 'mailtemp', component: EmailTemplateComponent, canActivate: [AuthGuard] },
      { path: 'mailsender', component: EmailSenderComponent, canActivate: [AuthGuard] },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  entryComponents: [
    RfqEditFormComponent,
    LoadingComponent,
    StatusEditFormComponent,
    ConfirmComponent,
    MessageComponent,
    ProductEditionFormComponent,
    ProductContainerComponent,
    EmailTemplatePreviewComponent
  ],
  providers: [
    RfqService,
    AccountService,
    AcceptService,
    EmailTemplateService,
    AuthGuard,
    NetworkService,
    CountryService,
    StatusService,
    ActionTypeService,
    RepService,
    RepSharedService,
    ProductSharedService,
    SummarySharedService,
    ProductService,
    [{
      provide: ErrorHandler,
      useClass: CutomErrorHandler
    }],
    RfqSharedService,
    EmailTemplateSharedService,
    EmailTemplateService,
    EmailSenderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
