import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async login() {
    const user = {
      'Email': 'tabuhmead@acs-me.com',
      'Password': '123456@AcsAcs',
    };
    const token$ = await this.accountService.login(user.Email, user.Password);

    token$.subscribe(userToken => {
      localStorage.setItem('userToken', userToken.toString());
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
    }, error => {
      alert(error.message);
    });

  }
}
