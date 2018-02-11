import { AcceptService } from './../../services/accept.service';
import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../services/order-service.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  order = {};

  constructor(
    private acceptService: AcceptService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }
<<<<<<< HEAD
  
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
  this.orderService.Post(f).subscribe( () => console.log("sucess") );
 
  }
=======
>>>>>>> 0588a12c2550c83f7f7bd4af5d142c526034b1d8


  logForm(f) {
    this.acceptService.getUserData()
      .subscribe(user => {
        this.order = {
          'delivery_needed': 'false',
          'merchant_id': user.id,
          'amount_cents': '100',
          'currency': 'EGP',
          'items': [],
          'shipping_data': {
            'apartment': '803',
            'email': f.email,
            'floor': '42',
            'first_name': f.firstName,
            'street': 'Ethan Land',
            'building': '8028',
            'phone_number': f.phoneNumber,
            'postal_code': '01898',
            'city': 'Jaskolskiburgh',
            'country': 'CR',
            'last_name': f.lastName,
            'state': 'Utah'
          }
        };

        this.orderService.Post(f).subscribe(() => console.log('sucess'));
      });
  }
}
