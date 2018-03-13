import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router) { }

  canActivate(route, state) {

    if (this.accountService.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
