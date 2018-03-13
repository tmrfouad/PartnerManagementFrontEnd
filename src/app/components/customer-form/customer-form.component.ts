import { Country } from '../../models/Country';
import { CountryService } from '../../services/country.service';
import { RfqService } from '../../services/rfq.service';
import { AcceptService } from '../../services/accept.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Countries } from '../../models/countries';
import { BaseComponent } from '../base-component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent {
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
    dialog: MatDialog,
    snackBar: MatSnackBar,
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private countryService: CountryService,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {
    super(snackBar, dialog);
    this.rfqItem.TargetedProduct = 'Process Perfect';
    this.countryService.getCurrentCountry().subscribe((item: Country) => {
      this.currentCuntry = item.country.toLowerCase();
      this.currentCuntry2 = item.country.toLowerCase();
    });
  }

  Searchtxt(Srchtxt) {
    this.currentCuntry = Srchtxt.toLowerCase();
  }

  Searchtxt2(Srchtxt) {
    this.currentCuntry2 = Srchtxt.toLowerCase();
  }

  async logForm(rfqForm) {
    rfqForm.sendEmail = true;
    this.showLoading('Please wait ...');
    const rfqCreate$ = await this.rfqService.post(rfqForm);
    rfqCreate$.subscribe(() => {
      this.showSnackBar('Request sent successfully', 'Success');
    }, error => {
      this.showSnackBar(error.message, 'Error', true);
    });
    this.closeLoading();
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
