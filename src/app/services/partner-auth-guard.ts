import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationError } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class PartnerAuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router) { }

  canActivate(route, state) {
    if (this.accountService.isPartner) {
      return true;
    }

    this.router.navigate(['/']);
    throw new Error('You must login as a partner first.');
  }
}
