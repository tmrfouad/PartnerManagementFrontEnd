import 'rxjs/add/observable/empty';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {
  private baseUrl: string;
  private headers: HttpHeaders;
  private jwtHelper: JwtHelper;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.jwtHelper = new JwtHelper();

    const domainName = environment.domainName;
    this.baseUrl = domainName + '/account';

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  async register(userName, password) {
    return this.http.post(this.baseUrl + '/register', { Email: userName, Password: password },
      { responseType: 'text', headers: this.headers });
  }


  async login(userName, password) {
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
