import { RfqService } from './../../services/rfq.service';
import { AcceptService } from './../../services/accept.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  contactPersonEnglishName;
  companyEnglishName;
  contactPersonEmail;
  contactPersonMobile;
  phoneNumber;
  selectedBundle;
  contactPersonPosition: string;
  address;
  website: string;
  targetedProduct: string;


  constructor(
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {

  }

  ngOnInit() {
   
  }



  async logForm(f) {
    // #region for comment 
        // comment
    // this.acceptService.getUserData()
    //   .subscribe(async user => {
    //     const order = {
    //       delivery_needed: false,
    //       merchant_id: user.id,
    //       amount_cents: 100,
    //       currency: 'EGP',
    //       items: [],
    //       shipping_data: {
    //         apartment: null,
    //         email: f.email,
    //         floor: null,
    //         first_name: f.firstName,
    //         street: null,
    //         building: null,
    //         phone_number: f.phoneNumber,
    //         postal_code: null,
    //         city: null,
    //         country: null,
    //         last_name: f.lastName,
    //         state: null
    //       }
    //     };

    //   });
    // #endregion
     
    await this.rfqService.Post(order).then(() => {
      this.dialogRef.close();
      alert('Order placed successfully.');
    }, error => {
      this.dialogRef.close();
      alert(error.message);
    });


  }

  closeDialog() {
    this.dialogRef.close();
  }
}
