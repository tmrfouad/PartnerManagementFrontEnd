import { BaseComponent } from './../../base-component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from '../../../models/Product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends BaseComponent implements OnInit {
  prodList: Product[];
  prod: Product = <Product>{};
  isNewRecord = false;

  constructor(private productService: ProductService,
    private router: Router,
    private prodService: ProductService,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    prodService.currentItem.subscribe((item: Product) => {
      if (item) {
        this.prod = item;
      }
    });
    prodService.currentItems.subscribe(prodList => this.prodList = prodList);
  }

  ngOnInit() {
  }

  async submitForm() {
    // Edit Product
    if (!this.isNewRecord) {
      this.showLoading('Loading');
      const product$ = await this.productService.put(this.prod.id, this.prod);
      await product$.toPromise().then((currentProduct: Product) => {
        this.closeLoading();
        this.showSnackBar('Product edited successfully', 'Success');
        // const i = this.prodList.indexOf(this.prod);
        // this.prodList[i] = currentProduct;
        // this.prodService.changeCurrentItems(this.prodList);
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else {
      // Add Product
      const product$ = await this.productService.post(this.prod);
      this.showLoading('Loading');
      product$.toPromise().then((prod: Product) => {
        this.prodList.push(prod);
        this.prodService.changeCurrentItems(this.prodList);
        this.closeLoading();
        this.showSnackBar('Product added successfully', 'Success');
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
  }
}
