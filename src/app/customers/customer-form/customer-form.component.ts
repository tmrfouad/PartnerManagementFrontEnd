import { Component, OnInit } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { OrderService } from '../../services/order-service.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }
  
 paymentItem : {} ;

 logForm(f) {
  this.paymentItem = {
    "delivery_needed": "false",
    "merchant_id": "28",     
    "amount_cents": "100",
    "currency": "EGP",  
    "shipping_dataId": 1,
    "items": [],
    "shipping_data": {
      "apartment": "803", 
      "email": f.email, 
      "floor": "42", 
      "first_name": f.firstName, 
      "street": "Ethan Land", 
      "building": "8028", 
      "phone_number": f.phoneNumber, 
      "postal_code": "01898", 
      "city": "Jaskolskiburgh", 
      "country": "CR", 
      "last_name": f.lastName, 
      "state": "Utah"
    }
  }
  this.orderService.Post(f).subscribe();
  console.log("sucess");
  }



}
