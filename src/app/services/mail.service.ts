import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(mail) {
    if (!mail) { return; }

    // const headers = new HttpHeaders({
    //   'Accept': 'application/json',
    //   'X-Requested-By': 'Angular 4',
    //   'Access-Control-Allow-Origin': '*'
    // });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    // headers.append('Content-Type', 'application/json');
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    console.log(headers);
    console.log(mail);
    this.http.post('http://localhost:5000/api/mail', mail, { headers: headers }).subscribe(() => console.log('success'));
    // this.http.post('http://localhost:5000/api/mail', mail).subscribe(() => console.log('success'));
  }

}
