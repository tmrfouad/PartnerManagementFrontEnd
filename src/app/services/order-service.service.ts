import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data-service.service';


@Injectable()
export class OrderService extends DataService {

  constructor(http: HttpClient) {
    super('/orders', http);
  }
}
