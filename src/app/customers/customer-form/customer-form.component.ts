import { Country } from './../../models/Country';
import { CountryService } from './../../services/country.service';
import { RfqService } from './../../services/rfq.service';
import { AcceptService } from './../../services/accept.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Countries } from './../../models/countries';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  countries = Countries.items;
  rfqItem =
    {
      ContactPersonEnglishName: '',
      CompanyEnglishName: '',
      ContactPersonEmail: '',
      ContactPersonMobile: '',
      PhoneNumber: '',
      SelectedBundle: '',
      ContactPersonPosition: '',
      Address: '',
      Website: '',
      TargetedProduct: '',
      Status: '',
      RFQCode: 100,
      CompanyArabicName: '',
      ContactPersonArabicName: '',
      Location: '',
      UniversalIP: ''

    };

  phoneIntial = '';
  phone = '';

  mobilIntial = '';
  mobilphone = '';
  currentCuntry: string;
  currentCuntry2: string;
  constructor(
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private countryService: CountryService,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    this.rfqItem.TargetedProduct = 'Process Perfect';
    this.countryService.getCurrentCountry().subscribe((item: Country) => {
      this.currentCuntry = item.country.toLowerCase();
      this.currentCuntry2 = item.country.toLowerCase();
    });
  }

  ngOnInit() {

  }

  Searchtxt(Srchtxt) {
    this.currentCuntry = Srchtxt.toLowerCase();
  }

  Searchtxt2(Srchtxt) {
    this.currentCuntry2 = Srchtxt.toLowerCase();
  }



  async logForm(rfqForm) {
    (await this.rfqService.Post(rfqForm)).subscribe(() => {
      alert('Order placed successfully.');
    }, error => {
      this.dialogRef.close();
      alert(error.message);
    });
  this.dialogRef.close();

  }

  closeDialog() {
    this.dialogRef.close();
  }

  countryChange() {
    this.rfqItem.ContactPersonMobile = this.phoneIntial + this.phone;
    this.rfqItem.PhoneNumber = this.mobilIntial + this.mobilphone;
  }

}
