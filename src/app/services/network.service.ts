import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NetworkService {
  url = 'https://api.ipify.org';

  constructor(private http: HttpClient) { }

  getIp() {
    return this.http.get(this.url, { responseType: 'text' }).toPromise().catch(error => {
      throw new Error(JSON.stringify(error));
    });
  }
}
