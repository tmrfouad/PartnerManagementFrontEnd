import { Component, OnInit, ViewChild } from '@angular/core';

import { Product } from '../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { BaseComponent } from '../../base-component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent extends BaseComponent implements OnInit {

  product: Product = <Product>{};

  @ViewChild('productForm') productForm: ProductFormComponent;

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
    this.productForm.isNewRecord = true;
    const product: Product = <Product>{};
    this.productService.changeCurrentItem(product);
    this.getElement('englishName').focus();
  }
}
