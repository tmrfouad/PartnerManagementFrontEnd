import { MainService } from './services/main-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CutomerCartComponent } from './customers/cutomer-cart/cutomer-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    NavbarComponent,
    CutomerCartComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
    RecaptchaFormsModule, 
    HttpModule ,
     RouterModule.forRoot([ { path : 'Customer' , component : CustomerFormComponent} ])
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
