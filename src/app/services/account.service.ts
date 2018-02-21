import { AcceptService } from './accept.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AccountService implements OnInit {
  private configUrl = 'assets/config.json';
  private baseUrl: string;
  private headers: HttpHeaders;
  private jwtHelper: JwtHelper;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.jwtHelper = new JwtHelper();

    this.http.get(this.configUrl).subscribe((config: any) => {
      const domainName = config.domainName;
      const dataServiceConfig = config.dataService;
      this.baseUrl = domainName + '/account';
    });

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  register(userName, password): Observable<string> {
    return this.http.post(this.baseUrl + '/register', { Email: userName, Password: password }, { headers: this.headers })
      .map(token => token.toString());
  }


  login(userName, password): Observable<string> {
    return this.http.post(this.baseUrl + '/Login', { Email: userName, Password: password }, { headers: this.headers })
      .map(token => token.toString());
  }

  get userToken(): string {
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
