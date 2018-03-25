import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BaseComponent } from '../../base-component';
import { Product } from './../../../models/Product';
import { ProductSharedService } from './../../../services/product-shared.service';
import { ProductService } from './../../../services/product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  product$: Observable<{}>;
  currentProduct: Product;
  productList: Product[] = [];
  selectedIndex = 0;

  constructor(private productService: ProductService,
    private prodSharService: ProductSharedService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(snackBar, dialog);
    prodSharService.currentProductList.subscribe(productList => this.productList = productList);
  }

  ngOnInit() {
    this.refreshProd();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async refreshProd() {
    this.product$ = await this.productService.get();
    this.subscription = this.product$.subscribe((item: Product[]) => {
      this.productList = item;
      if (this.productList.length > 0) {
        this.prodSharService.changeProduct(this.productList[0]);
        this.prodSharService.changeProductList(this.productList);
        this.selectedIndex = 0;
      }
    });
  }

  selectedRep(product, i) {
    this.selectedIndex = i;
    this.prodSharService.changeProduct(product);
  }

  removeRep(product: Product) {
    this.showConfirm(`Are you sure you want to delete this Product ( ${product.englishName}) ?`, 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.productService.delete(product.id);
        del.subscribe(() => {
          this.refreshProd();
        });
      }
    });
  }

  addProd() {
    this.selectedIndex = -1;
    // add product as property as the VS not accept the const
    const product: Product = <Product>{};
    this.prodSharService.changeProduct(product);
  }
}
