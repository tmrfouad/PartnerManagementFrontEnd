import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base-component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  email;
  password;

  constructor(
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {

    super(snackBar, dialog);
  }

  ngOnInit() {
  }

  inputKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  async login() {
    this.showLoading('Please Wait ...');
    const user = {
      'Email': this.email,
      'Password': this.password
    };
    const token$ = await this.accountService.login(user.Email, user.Password);

    token$.subscribe(userToken => {
      this.closeLoading();
      localStorage.setItem('userToken', userToken.toString());
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/']);
    }, error => {
      this.closeLoading();
      throw error;
    });

  }
}
