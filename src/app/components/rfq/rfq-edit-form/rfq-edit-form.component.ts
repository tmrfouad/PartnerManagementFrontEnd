import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Countries } from '../../../models/countries';
import { RFQ } from '../../../models/RFQ';
import { RfqService } from '../../../services/rfq.service';
import { BaseComponent } from '../../base-component';
import { NetworkService } from '../../../services/network.service';
import { StatusService } from '../../../services/status.service';
import { Status } from '../../../models/Status';
import { ActionType } from '../../../models/ActionType';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/Product';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProductEdition } from '../../../models/ProductEdition';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rfq-edit-form',
  templateUrl: './rfq-edit-form.component.html',
  styleUrls: ['./rfq-edit-form.component.css']
})
export class RfqEditFormComponent extends BaseComponent implements OnInit, OnDestroy {
  countries = Countries.items;
  // rfqParameterItem: RFQ = <RFQ>{};
  rfq: RFQ = <RFQ>{};
  sendEmail = false;
  statuses: { value: string, name: string }[] = [];
  products: Product[];
  productSubs: Subscription;
  editions: ProductEdition[];
  editionSubs: Subscription;

  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    private rfqService: RfqService,
    private netService: NetworkService,
    private statusService: StatusService,
    private dialogRef: MatDialogRef<RfqEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {mode: string, rfq: RFQ},
    private prodService: ProductService) {
    super(snackBar, dialog);

    this.statuses = this.statusService.getArray();
  }

  async ngOnInit() {
    const products$ = (await this.prodService.get()) as Observable<Product[]>;
    this.productSubs = products$.subscribe(products => {
      this.products = products;
    });

    if (this.dialogData.mode === 'edit') {
      this.rfq = this.dialogData.rfq;
    } else {
      this.rfq.targetedProductId = 1;
      this.rfq.status = 0;
    }

    this.filterEditions(this.rfq.targetedProductId);
  }

  ngOnDestroy() {
    this.productSubs.unsubscribe();
    this.editionSubs.unsubscribe();
  }

  async filterEditions(productId) {
    const editions$ = (await this.prodService.getEditions(productId)) as Observable<ProductEdition[]>;
    this.editionSubs = editions$.subscribe(editions => {
      this.editions = editions;
    });
  }

  async submit() {
    this.showLoading('Please wait ...');
    if (this.dialogData.mode === 'new') {
      const rfqItem$ = await this.rfqService.post(this.rfq);
      rfqItem$.subscribe(() => {
        this.closeLoading();
        this.showSnackBar('Request saved successfully', 'Success');
        this.dialogRef.close({ dialogResult: 'save' });
      }, error => {
        this.closeLoading();
        throw error;
      });
    } else {
      const rfqItem$ = await this.rfqService.put(this.rfq.rfqId, this.rfq);
      rfqItem$.subscribe(() => {
        this.closeLoading();
        this.showSnackBar('Request saved successfully', 'Success');
        this.dialogRef.close({ dialogResult: 'save' });
      }, error => {
        this.closeLoading();
        throw error;
      });
    }
  }


  closeDialog() {
    this.dialogRef.close({ dialogResult: 'cancel' });
  }

  productChange(event) {
    const productId = event.target.value;
    console.log(event);
    // this.rfq.targetedProduct = this.products.find(p => p.id.toString() === productId.toString());
    this.filterEditions(productId);
  }

}
