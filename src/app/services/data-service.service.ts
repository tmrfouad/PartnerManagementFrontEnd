import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  url: string ;
  constructor(private http: HttpClient) {
  }
  get() {
    return this.http.get(this.url) ;
  }

  Post(item) {
    return this.http.post(this.url, item) ;
  }

  Put(item) {
    return this.http.put(this.url + '/' + item.id , item) ;
  }

  Delete(id) {
    return this.http.delete(this.url + '/' + id) ;
  }

}
