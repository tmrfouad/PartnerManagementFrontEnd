import { MainService } from './../services/main-service.service';
import { Component} from '@angular/core'; 


@Component({
  selector: 'mail-send',
  templateUrl: './mail-send.component.html',
  styleUrls: ['./mail-send.component.css']
})

export class MailSendComponent {

  constructor(item? : MainService) {  
  }

  serverContent = {
  user: 'angularTesting2022@gmail',
  password: '123456789@acs',
  host: 'smtp.gmail.com',
  ssl: true,
  Port: 2525 
   //587 465
};
   message = {
    text: 'Hey from angular',
    from: 'angularTesting',
    to: 'ssss <ssss@send22u.info>',
    cc: 'abdel_moneim <abdel_moneim122@hotmail.com>',
    subject: 'Greetings'
  } ;

  sendMail() {  

     var email = require('emailjs'); 
     var server = email.server.connect(this.serverContent); 
     server.send(this.message , function (err, message) { console.log(err || message); });

   
  }

}
