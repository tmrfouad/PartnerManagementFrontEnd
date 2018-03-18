import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../../services/product.service';
import { BaseComponent } from './../../base-component';
import { ProductEdition } from '../../../models/ProductEdition';
import { Product } from '../../../models/Product';
import { ProductEditionFormComponent } from '../product-edition-form/product-edition-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-edition-list',
  templateUrl: './product-edition-list.component.html',
  styleUrls: ['./product-edition-list.component.css']
})
export class ProductEditionListComponent extends BaseComponent implements OnInit, OnDestroy {

  product$: Observable<{}>;
  prodEditionList: ProductEdition[];
  subscription: Subscription;


  // tslint:disable-next-line:no-input-rename
  private _prod: Product;
  get product(): Product {
    return this._prod;
  }
  @Input('product') set product(value: Product) {
    this._prod = value;
    this.refreshProdEdition(this._prod);
  }

  constructor(private productService: ProductService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(snackBar, dialog);
  }
  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async refreshProdEdition(ptoduct: Product) {
    this.product$ = await this.productService.getEditions(ptoduct.id);
    this.subscription = this.product$.subscribe((item: ProductEdition[]) => {
      this.prodEditionList = item;
    });
  }


  openDialog(edition) {
    const dialogRef = this.dialog.open(ProductEditionFormComponent, {
      width: '800px',
      position: { top: '130px' },
      data: { edition: edition, status: 'edit' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'done') {
        this.refreshProdEdition(this.product);
      }
    });
  }

  addEditionDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductEditionFormComponent, {
      width: '800px',
      position: { top: '130px' },
      data: { product: product, status: 'new' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'done') {
        this.refreshProdEdition(this.product);
      }
    });
  }

  DeleteEdition(id) {
    this.showConfirm('Are you sure you want to delete this Edition?', 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.productService.deleteEdition(this.product.id, id);
        del.subscribe(() => {
          this.refreshProdEdition(this.product);
        });
      }
    });
  }

}
