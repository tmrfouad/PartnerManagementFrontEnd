import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  private configUrl = 'assets/config.json';
  protected baseUrl: string;
  protected headers: HttpHeaders;
  private token: string;
  config;

  protected url: string;

  constructor(
    protected http: HttpClient,
    protected accountService: AccountService
  ) {
    this.config = this.http.get(this.configUrl).toPromise();
    this.config.then(config => {
      const domainName = config.domainName;
      this.baseUrl = domainName + '/api';

      this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    });
  }

  async get() {
    await this.config;
    if (this.accountService.userToken) {
      this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    }
    return this.http.get(this.baseUrl + this.url, { headers: this.headers });
  }

  async getById(Id) {
    await this.config;
    if (this.accountService.userToken) {
      this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    }
    return this.http.get(this.baseUrl + this.url + '/' + Id, { headers: this.headers });
  }

  async Post(item) {
    await this.config;
    if (this.accountService.userToken) {
      this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    }
    return this.http.post(this.baseUrl + this.url, item, { headers: this.headers });
  }

  async Put(id, item) {
    await this.config;
    if (this.accountService.userToken) {
      this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    }
    return this.http.put(this.baseUrl + this.url + '/' + id, item, { headers: this.headers });
  }

  async Delete(id) {
    await this.config;
    if (this.accountService.userToken) {
      this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    }
    return this.http.delete(this.baseUrl + this.url + '/' + id, { headers: this.headers });
  }

}

// const rfq = {
//   CompanyEnglishName: '',
//   ContactPersonEnglishName: f.firstName + ' ' + f.lastName,
//   ContactPersonEmail: f.email,
//   ContactPersonMobile: f.phoneNumber,
//   PhoneNumber: '',
//   TargetedProduct: '',
//   SelectedBundle: '',
//   CompanyArabicName: '',
//   Website: '',
//   Location: '',
//   Address: '',
//   ContactPersonArabicName: '',
//   ContactPersonPosition: '',
//   Status: '',
//   SubmissionTime: '',
//   UniversalIP: '' // https://jsonip.com/ OR https://api.ipify.org/?format=json
// };
