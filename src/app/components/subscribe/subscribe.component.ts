import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Country } from '../../models/Country';
import { AcceptService } from '../../services/accept.service';
import { CountryService } from '../../services/country.service';
import { RfqService } from '../../services/rfq.service';
import { BaseComponent } from '../base-component';
import { RFQ } from '../../models/RFQ';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent extends BaseComponent implements OnInit {
  loading = false;
  rfqItem: RFQ = {};

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
    this.rfqItem.targetedProduct = 'Process Perfect';
    this.countryService.getCurrentCountry().subscribe((item: Country) => {
      this.currentCuntry = item.country.toLowerCase();
      this.currentCuntry2 = item.country.toLowerCase();
    });
    const edition = route.snapshot.paramMap.get('bundle');
    if (edition) {
      this.rfqItem.selectedBundle = edition;
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
    const rfqCreate$ = await this.rfqService.post(rfqForm);
    rfqCreate$.subscribe(() => {
      this.closeLoading();
      this.showSnackBar('Order placed successfully.', 'Success');
      this.router.navigate(['/']);
    }, error => {
      this.closeLoading();
      this.showSnackBar(error.message, 'Error', true);
    });

  }

  countryChange() {
    this.rfqItem.contactPersonMobile = this.phoneIntial + this.phone;
    this.rfqItem.phoneNumber = this.mobilIntial + this.mobilphone;
  }
}
