import { Country } from './../models/Country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {
  private url = 'http://ip-api.com/json/?fields=country';
  constructor(private http: HttpClient) {

  }

  getCurrentCountry() {
    return this.http.get(this.url);
  }


}
