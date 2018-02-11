import { AcceptService } from './services/accept.service';
import { MailService } from './services/mail.service';
import { OrderService } from './services/order-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
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


@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    MailSendComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
    RecaptchaFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path : '' , component: HomeComponent },
      { path : 'customer' , component: CustomerFormComponent }
    ])
  ],
  providers: [
    AcceptService,
    OrderService,
    MailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
