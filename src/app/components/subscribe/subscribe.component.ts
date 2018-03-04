import { Country } from '../../models/Country';
import { CountryService } from '../../services/country.service';
import { RfqService } from '../../services/rfq.service';
import { AcceptService } from '../../services/accept.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Countries } from '../../models/countries';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
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
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private countryService: CountryService,
    private dialog: MatDialog,
    private router: Router) {
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
    const dialogRef = this.dialog.open(LoadingComponent, {
      width: '300',
      height: '150',
      disableClose: false
    });
    (await this.rfqService.Post(rfqForm)).subscribe(() => {
      dialogRef.close();
      alert('Order placed successfully.');
      this.router.navigate(['/']);
    }, error => {
      dialogRef.close();
      alert(error.message);
    });

  }

  countryChange() {
    this.rfqItem.ContactPersonMobile = this.phoneIntial + this.phone;
    this.rfqItem.PhoneNumber = this.mobilIntial + this.mobilphone;
  }
}
