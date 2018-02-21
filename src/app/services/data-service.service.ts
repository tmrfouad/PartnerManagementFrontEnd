import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
  private configUrl = 'assets/config.json';
  private baseUrl: string;
  private headers: HttpHeaders;
  private token: string;

  protected url: string;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.http.get(this.configUrl).subscribe((config: any) => {
      const domainName = config.domainName;
      this.baseUrl = domainName + '/api';
    });

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
  }

  get() {
    this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.get(this.baseUrl + this.url, { headers: this.headers });
  }

  Post(item) {
    this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.post(this.baseUrl + this.url, item, { headers: this.headers });
  }

  Put(id, item) {
    this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
    return this.http.put(this.baseUrl + this.url + '/' + id, item, { headers: this.headers });
  }

  Delete(id) {
    this.headers.set('Authorization', 'bearer ' + this.accountService.userToken);
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
