import { AccountService } from './../services/account.service';
import { CustomerFormComponent } from './../customers/customer-form/customer-form.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private accountService: AccountService) { }

  dialogRef: MatDialogRef<CustomerFormComponent>;
  dialogRefSub: Subscription;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dialogRefSub.unsubscribe();
  }

  openOrderDialog() {
    if (this.dialogRef == null) {
      this.dialogRef = this.dialog.open(CustomerFormComponent, {
        width: '900px',
        height: '500px',
        position: { top: '100px' }
      });

      this.dialogRefSub = this.dialogRef.afterClosed().subscribe(result => {
        this.dialogRef = null;
      });

    }
  }

  async login() {
    const user = {
      'Email': 'tabuhmead@acs-me.com',
      'Password': '123456@AcsAcs',
    };
    const token$ = await this.accountService.login(user.Email, user.Password);

    token$.subscribe(userToken => {
      console.log('test');
      localStorage.setItem('userToken', userToken.toString());
      alert('Login Secceeded!');
    }, error => {
      console.log(error);
    });

  }
}
