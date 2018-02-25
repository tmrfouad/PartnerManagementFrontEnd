import { CustomerFormComponent } from './../customers/customer-form/customer-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private dialog :MatDialog) { }
  dialogRef : MatDialogRef<CustomerFormComponent> ;

  ngOnInit() { }

  openDialog(bundleVal) { 
      if(this.dialogRef == null ) 
      {
        this.dialogRef = this.dialog.open(CustomerFormComponent, 
          {
            width: '900px',
            height: '500px', 
            position: { top: '100px' }
           },
        );
        this.dialogRef.componentInstance.selectedBundle = bundleVal ;
      }

      this.dialogRef.afterClosed().subscribe( () => this.dialogRef = null );


  }

}
