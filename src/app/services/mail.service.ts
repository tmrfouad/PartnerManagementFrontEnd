import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MailService {

  constructor(private http: Http) { }

  sendMail(mail) {
    if (!mail) { return; }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // const requestOptions: RequestOptions = new RequestOptions({ headers: headers });

    console.log(mail);
    this.http.post('http://localhost:5000/api/mail', JSON.stringify(mail), { headers: headers }).subscribe(() => console.log('success'));
  }

}
