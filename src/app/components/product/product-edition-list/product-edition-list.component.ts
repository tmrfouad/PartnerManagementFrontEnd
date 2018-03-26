import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../../../models/Product';
import { ProductEdition } from '../../../models/ProductEdition';
import { ProductSharedService } from '../../../services/product-shared.service';
import { ProductService } from '../../../services/product.service';
import { ProductEditionFormComponent } from '../product-edition-form/product-edition-form.component';
import { BaseComponent } from './../../base-component';

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

  private product: Product;
  constructor(private productService: ProductService,
    private productSharedService: ProductSharedService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(snackBar, dialog);
    this.productSharedService.currentProduct.subscribe(prod => {
      this.product = prod;
      this.refreshProdEdition(this.product);
    });
    this.productSharedService.currentEditionList.subscribe(
      (prod: ProductEdition[]) => this.prodEditionList = prod);
  }
  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async refreshProdEdition(product: Product) {
    if (product) {
      this.product$ = await this.productService.getEditions(product.id);
      this.subscription = this.product$.subscribe((item: ProductEdition[]) => {
        this.prodEditionList = item;
        this.productSharedService.changeEditionList(this.prodEditionList);
      });
    }
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

  DeleteEdition(edition: ProductEdition) {
    this.showConfirm('Are you sure you want to delete this Edition?', 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.productService.deleteEdition(this.product.id, edition.id);
        del.subscribe(() => {
          this.refreshProdEdition(this.product);
        });
      }
    });
  }

}
