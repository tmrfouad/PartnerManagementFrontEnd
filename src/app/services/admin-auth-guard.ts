import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router) { }

  canActivate(route, state) {
    if (this.accountService.isAdmin) {
      return true;
    }

    this.router.navigate(['/']);
    throw new Error('You must login as an admin first.');
  }
}
