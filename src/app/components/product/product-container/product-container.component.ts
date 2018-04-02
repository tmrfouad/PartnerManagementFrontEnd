import { Component, OnInit } from '@angular/core';

import { Product } from '../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { BaseComponent } from '../../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent extends BaseComponent implements OnInit {

  product: Product = <Product>{};


  constructor(
    snackBar: MatSnackBar,
    dialog: MatDialog,
    public productService: ProductService) {

    super(snackBar, dialog);

    productService.currentItem.subscribe((item: Product) => {
      if (item) { this.product = item; }
    });
  }

  ngOnInit() {
  }

  addProd() {
    const product: Product = <Product>{};
    this.productService.changeCurrentItem(product);
    this.getElement('englishName').focus();
  }
}
