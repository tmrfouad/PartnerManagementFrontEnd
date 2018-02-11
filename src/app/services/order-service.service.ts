import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data-service.service';


@Injectable()
export class OrderService  extends DataService{

  constructor(http : HttpClient) {
    super("/orders", http);

    
 }


 

}
