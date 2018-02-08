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


  

}
