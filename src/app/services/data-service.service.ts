import { AccountService } from './account.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService implements OnInit {
  private configUrl = 'assets/config.json';
  private baseUrl: string;
  private headers: HttpHeaders;
  private token: string;

  protected url: string;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.http.get(this.configUrl).subscribe((config: any) => {
      const domainName = config.domainName;
      this.baseUrl = domainName + '/api';
    });

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  get() {
    this.headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.get(this.baseUrl + this.url, { headers: this.headers });
  }

  Post(item) {
    this.headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.post(this.baseUrl + this.url, item, { headers: this.headers });
  }

  Put(id, item) {
    this.headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.put(this.baseUrl + this.url + '/' + id, item, { headers: this.headers });
  }

  Delete(id) {
    this.headers = new HttpHeaders()
      .set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.delete(this.baseUrl + this.url + '/' + id, { headers: this.headers });
  }

}
