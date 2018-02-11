import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  baseUrl: string ;
  private headers: HttpHeaders;

  constructor(private url:string, private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    this.baseUrl = "http://localhost:5000/api";
  }

  get() {
    return this.http.get(this.baseUrl + this.url, {headers: this.headers}) ;
  }

  Post(item) {
    return this.http.post(this.baseUrl + this.url, {headers: this.headers}, item) ;
  }

  Put(item) {
    return this.http.put(this.baseUrl  + this.url + '/' + item.id, {headers: this.headers} , item) ;
  }

  Delete(id) {
    return this.http.delete(this.baseUrl + this.url + '/' + id, {headers: this.headers}) ;
  }

}
