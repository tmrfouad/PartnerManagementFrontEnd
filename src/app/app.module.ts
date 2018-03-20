import { RepService } from './services/rep.service';
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
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { MessageComponent } from './components/message/message.component';
import { SummaryComponent } from './components/rfq/summary/summary.component';
import { StatusService } from './services/status.service';
import { ActionTypeService } from './services/action-type.service';
import { RepFormComponent } from './components/rep/rep-form/rep-form.component';
import { RepListComponent } from './components/rep/rep-list/rep-list.component';
import { RepContainerComponent } from './components/rep/rep-container/rep-container.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductContainerComponent } from './components/product/product-container/product-container.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductEditionFormComponent } from './components/product/product-edition-form/product-edition-form.component';
import { ProductEditionListComponent } from './components/product/product-edition-list/product-edition-list.component';
import { ListViewComponent } from './components/list-view/list-view.component';

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
    CustomerFormComponent,
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
    ListViewComponent
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
      { path: 'login', component: LoginComponent },
      { path: 'products', component: ProductContainerComponent, canActivate: [AuthGuard] },
      { path: 'rep', component: RepContainerComponent, canActivate: [AuthGuard] },
      { path: 'Rfq', component: RfqContainarComponent, canActivate: [AuthGuard] }
    ])
  ],
  entryComponents: [
    RfqEditFormComponent,
    LoadingComponent,
    StatusEditFormComponent,
    ConfirmComponent,
    MessageComponent,
    ProductEditionFormComponent,
    ProductContainerComponent
  ],
  providers: [
    RfqService,
    AccountService,
    AcceptService,
    MailService,
    AuthGuard,
    NetworkService,
    CountryService,
    StatusService,
    ActionTypeService,
    RepService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
