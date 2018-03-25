import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Product } from '../../models/Product';
import { RFQ } from '../../models/RFQ';
import { AcceptService } from '../../services/accept.service';
import { CountryService } from '../../services/country.service';
import { RfqService } from '../../services/rfq.service';
import { BaseComponent } from '../base-component';
import { ProductService } from './../../services/product.service';
import { ProductEdition } from '../../models/ProductEdition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent extends BaseComponent implements OnInit, OnDestroy {
  loading = false;
  rfqItem: RFQ = {};

  productName: string;
  editionName: string;

  phoneIntial = '';
  phone = '';

  mobilIntial = '';
  mobilphone = '';

  products: Product[];
  editions: ProductEdition[];

  productSubscribe: Subscription;
  productEditionSubscribe: Subscription;

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private acceptService: AcceptService,
    private rfqService: RfqService,
    private countryService: CountryService,
    private router: Router,
    private productService: ProductService
  ) {
    super(snackBar, dialog);


  }

  async ngOnInit() {
    const product$ = await this.productService.get();
    this.productSubscribe = product$.subscribe((item: Product[]) => {
      this.products = item;
    });
    this.filterEditions(this.rfqItem.targetedProductId);
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
      throw error;
    });

  }

  countryChange() {
    this.rfqItem.contactPersonMobile = this.phoneIntial + this.phone;
    this.rfqItem.phoneNumber = this.mobilIntial + this.mobilphone;
  }

  productChange(event) {
    this.productName = event.target.options[event.target.selectedIndex].text;
    this.filterEditions(event.target.value);
  }

  editionChange(event) {
    this.editionName = event.target.options[event.target.selectedIndex].text;
  }

  async filterEditions(productId) {
    const editions$ = await this.productService.getEditions(productId);
    this.productEditionSubscribe = editions$.subscribe((editions: ProductEdition[]) => {
      this.editions = editions;
      if (this.editions && this.editions.length > 0) {
        this.rfqItem.selectedEditionId = editions[0].id;
        this.editionName = editions[0].englishName;
      } else {
        this.rfqItem.selectedEditionId = null;
        this.editionName = '';
      }
    });
  }

  ngOnDestroy() {
    this.productSubscribe.unsubscribe();
    this.productEditionSubscribe.unsubscribe();
  }
}
