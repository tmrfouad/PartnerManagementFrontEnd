import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
import { TranslateService } from 'ng2-translate';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    public accountService: AccountService,
    public translate: TranslateService) { }


  ngOnInit() {
    this.isLoggedIn = this.accountService.isLoggedIn;
  }
}
