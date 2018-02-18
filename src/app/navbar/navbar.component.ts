import { CustomerFormComponent } from './../customers/customer-form/customer-form.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog) { }
  
  dialogRef: MatDialogRef<CustomerFormComponent>;
  dialogRefSub: Subscription;

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dialogRefSub.unsubscribe();
  }

  openOrderDialog() {

    if(this.dialogRef == null){ 
      this.dialogRef  = this.dialog.open(CustomerFormComponent, {
      width: '900px',
      height: '500px',
      position: { top: '100px' }
    });


    this.dialogRefSub = this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef = null;
    });

  }
  }
}
