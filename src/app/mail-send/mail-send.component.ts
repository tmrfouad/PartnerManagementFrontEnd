import { MainService } from './../services/main-service.service';
import { Component} from '@angular/core';
import * as email from 'emailjs/email';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mail-send',
  templateUrl: './mail-send.component.html',
  styleUrls: ['./mail-send.component.css']
})

export class MailSendComponent {

  constructor(item?: MainService) {
  }

  serverContent = {
  user: 'angularTesting2022@gmail',
  password: '123456789@acs',
  host: 'smtp.gmail.com',
  ssl: true,
  Port: 2525
   // 587 465
};
   message = {
    text: 'Hey from angular',
    from: 'angularTesting',
    to: 'ssss <ssss@send22u.info>',
    cc: 'abdel_moneim <abdel_moneim122@hotmail.com>',
    subject: 'Greetings'
  } ;

  sendMail() {

    // mail body
    // {
    //   "SMTP": {
    //     "Domain": "",
    //     "Port": ,
    //     "EnableSsl": false,
    //     "Timeout": ,
    //     "DeliveryMethod": "",
    //     "UseDefaultCredentials": false,
    //     "UserName": "",
    //     "Password": ""
    //   },
    //   "Message": {
    //     "To": [""],
    //     "From": "",
    //     "Subject": "",
    //   "Body": "",
    //   "IsBodyHtml": false
    //   }
    // }

     // var email = require('./emailjs/email');

     const server = email.server.connect(this.serverContent);
     server.send(this.message , function (err, message) { console.log(err || message); });
  }

}
