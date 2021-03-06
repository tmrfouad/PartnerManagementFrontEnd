import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Order } from '../models/order';
import { environment } from '../../environments/environment.prod';

const user = {
  username: 'tmrfouad',
  password: '123456@AcsAcs',
  expiration: '3600'
};

@Injectable()
export class AcceptService {
  config: {
    authUrl: string,
    orderUrl: string
  };
  userData;

  constructor(private http: HttpClient) {
    const acceptConfig = environment.accept;
    const baseUrl = acceptConfig.baseUrl;
    this.config = {
      authUrl: baseUrl + '/' + acceptConfig.authUrl,
      orderUrl: baseUrl + '/' + acceptConfig.orderUrl
    };
  }

  getUserData(): Observable<any> {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return new Observable(observer => {
        this.userData = JSON.parse(userData);
        observer.next(this.userData);
        observer.complete();
      }).catch(error => {
        throw new Error(JSON.stringify(error));
      });
    } else {
      return this.authRequest();
    }
  }

  authRequest() {
    return this.http.post(this.config.authUrl, user).map(response => {
      this.userData = response;
      localStorage.setItem('userData', JSON.stringify(this.userData));
      return this.userData;
    }).catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }

  orderRegRequest(order: Order) {
    return this.getUserData().switchMap(userData => {
      // const order: Order = {
      //   delivery_needed: false,
      //   merchant_id: userData.id,
      //   amount_cents: 100,
      //   currency: 'EGP',
      //   merchant_order_id: 2,
      //   items: [],
      //   shipping_data: {
      //     apartment: '803',
      //     email: 'claudette09@exa.com',
      //     floor: 42,
      //     first_name: 'Clifford',
      //     street: 'Ethan Land',
      //     building: '8028',
      //     phone_number: '+86(8)9135210487',
      //     postal_code: '01898',
      //     city: 'Jaskolskiburgh',
      //     country: 'CR',
      //     last_name: 'Nicolas',
      //     state: 'Utah'
      //   }
      // };
      return this.http.post(this.config.orderUrl + '?token=' + userData.token, order)
        .catch(error => {
          throw new Error(JSON.stringify(error));
        });
    });
  }
}
