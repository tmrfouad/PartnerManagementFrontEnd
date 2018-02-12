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
  constructor(
    private acceptService: AcceptService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  logForm(f) {
    this.acceptService.getUserData()
      .subscribe(user => {
        const order = {
          delivery_needed: false,
          merchant_id: user.id,
          amount_cents: 100,
          currency: 'TEST',
          items: [],
          shipping_data: {
            apartment: '803',
            email: f.email,
            floor: '42',
            first_name: f.firstName,
            street: 'Ethan Land',
            building: '8028',
            phone_number: f.phoneNumber,
            postal_code: '01898',
            city: 'Jaskolskiburgh',
            country: 'CR',
            last_name: f.lastName,
            state: 'Utah'
          }
        };
        console.log(order);
        this.orderService.Post(order)
        .subscribe(() => console.log('sucess'))
        ;
      });
  }

}
