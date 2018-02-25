import { AccountService } from './../services/account.service';
import { CustomerFormComponent } from './../customers/customer-form/customer-form.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<CustomerFormComponent>;
  dialogRefSub: Subscription;
  isLoggedIn: boolean;

  constructor(
    private dialog: MatDialog,
    public accountService: AccountService) { }


  ngOnInit() {
    this.isLoggedIn = this.accountService.isLoggedIn;
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
}
