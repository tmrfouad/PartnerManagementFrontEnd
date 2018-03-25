import { ProductSharedService } from '../../../services/product-shared.service';
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
  currentProduct: Product = <Product>{};


  constructor(private productService: ProductService,
    private router: Router,
    private prodSharedService: ProductSharedService,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    prodSharedService.currentProduct.subscribe((item: Product) => {
      this.prod = item;
      if (item && Object.keys(item).length > 0) {
        this.currentProduct = Object.assign(this.currentProduct, item);
      } else {
        this.currentProduct = <Product>{};
      }
    });
    prodSharedService.currentProductList.subscribe(prodList => this.prodList = prodList);
  }

  ngOnInit() {
  }

  async submitForm(product: any) {
    // Edit Product
    if (this.prod && Object.keys(this.prod).length > 0) {
      this.showLoading('Loading');
      const product$ = await this.productService.put(product.id, product);
      await product$.toPromise().then((currentProduct: Product) => {
        this.closeLoading();
        this.showSnackBar('Product edited successfully', 'Success');
        this.prod = Object.assign(this.prod, currentProduct);
        this.prodSharedService.changeProduct(this.prod);
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else {
      // Add Product
      const product$ = await this.productService.post(product);
      this.showLoading('Loading');
      product$.toPromise().then((prod: Product) => {

        this.prod = Object.assign(this.prod, prod);
        this.prodSharedService.changeProduct(this.prod);
        this.prodList.push(product);
        this.prodSharedService.changeProductList(this.prodList);

        this.closeLoading();
        this.showSnackBar('Product added successfully', 'Success');
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
  }
}
