import { MailService } from './../services/mail.service';
import { DataService } from './../services/data-service.service';
import { Component} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mail-send',
  templateUrl: './mail-send.component.html',
  styleUrls: ['./mail-send.component.css']
})

export class MailSendComponent {

  constructor(
    private service: DataService,
    private mailService: MailService) { }


  sendMail() {

    const mail = {
      SMTP: {
        Domain: 'smtp.gmail.com',
        Port: 587,
        EnableSsl: true,
        Timeout: 100000,
        DeliveryMethod: 'Network',
        UseDefaultCredentials: false,
        UserName: 'angulartesting2022',
        Password: '123456789@acs'
      },
      Message: {
        To: ['hammerknight@gmail.com'],
        From: 'angulartesting2022@gmail.com',
        Subject: 'Sending For Test from angular...',
      Body: 'Hello From Angular',
      IsBodyHtml: false
      }
    };

    this.mailService.sendMail(mail);
  }

}
