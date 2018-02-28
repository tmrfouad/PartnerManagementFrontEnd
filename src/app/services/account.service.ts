import 'rxjs/add/observable/empty';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {
  private configUrl = 'assets/config.json';
  private baseUrl: string;
  private headers: HttpHeaders;
  private jwtHelper: JwtHelper;
  config;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.jwtHelper = new JwtHelper();

    this.config = this.http.get(this.configUrl).toPromise();

    this.config.then((config: any) => {
      const domainName = config.domainName;
      const dataServiceConfig = config.dataService;
      this.baseUrl = domainName + '/account';

      this.headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
    });
  }

  async register(userName, password) {
    await this.config;
    return this.http.post(this.baseUrl + '/register', { Email: userName, Password: password },
      { responseType: 'text', headers: this.headers });
  }


  async login(userName, password) {
    await this.config;
    return this.http.post(this.baseUrl + '/Login', { Email: userName, Password: password },
      { responseType: 'text', headers: this.headers });
  }

  logout() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      localStorage.removeItem('userToken');
      this.router.navigate(['/']);
    }
  }

  get userToken() {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {

      if (this.jwtHelper.isTokenExpired(userToken)) {
        return '';
      }

      return userToken;

    } else {

      return '';

    }
  }

  get isLoggedIn() {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      return false;
    }

    const isExpired = this.jwtHelper.isTokenExpired(userToken);

    return !isExpired;
  }
}
