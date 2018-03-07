import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Country } from '../../models/Country';
import { AcceptService } from '../../services/accept.service';
import { CountryService } from '../../services/country.service';
import { RfqService } from '../../services/rfq.service';
import { BaseComponent } from '../base-component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent extends BaseComponent implements OnInit {
  loading = false;
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
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute) {

    super(snackBar, dialog);
    this.rfqItem.TargetedProduct = 'Process Perfect';
    this.countryService.getCurrentCountry().subscribe((item: Country) => {
      this.currentCuntry = item.country.toLowerCase();
      this.currentCuntry2 = item.country.toLowerCase();
    });
    const edition = route.snapshot.paramMap.get('bundle');
    if (edition) {
      this.rfqItem.SelectedBundle = edition;
    }
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
    this.showLoading('Please wait ...');
    this.rfqService.Post(rfqForm).subscribe(() => {
      this.closeLoading();
      this.showSnackBar('Order placed successfully.', 'Success');
      this.router.navigate(['/']);
    }, error => {
      this.closeLoading();
      this.showSnackBar(error.message, 'Error', true);
    });

  }

  countryChange() {
    this.rfqItem.ContactPersonMobile = this.phoneIntial + this.phone;
    this.rfqItem.PhoneNumber = this.mobilIntial + this.mobilphone;
  }
}
