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
  // tslint:disable-next-line:no-input-rename
  private _prod: Product;
  get prod(): Product {
    return this._prod;
  }

  @Input('productItem') set prod(value: Product) {
    this._prod = value;
    if (this._prod) {
      this.currentProduct = Object.assign(<Product>{}, this.prod);
    }
  }

  @Output('reload') reload = new EventEmitter();
  @Input('status') status: string;

  currentProduct = <Product>{};
  constructor(private productService: ProductService,
    private router: Router,
    snackBar: MatSnackBar,
    dialog: MatDialog) {
    super(snackBar, dialog);
    this.status = 'new';
  }

  ngOnInit() {
  }

  async submitForm(product: any) {
    if (this.status === 'new') {
      const product$ = await this.productService.post(product);
      this.showLoading('Loading');
      product$.toPromise().then(() => {
        this.reload.emit('reload');
        this.closeLoading();
        this.showSnackBar('Product added successfully', 'Success');
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    } else {
      this.showLoading('Loading');
      const product$ = await this.productService.put(product.id, product);
      await product$.toPromise().then((currentProduct: Product) => {
        this.closeLoading();
        this.showSnackBar('Product edited successfully', 'Success');
        this.prod = Object.assign(this.prod, currentProduct);
        // this.reload.emit('reload');
      }).catch(error => {
        this.closeLoading();
        throw error;
      });
    }
  }
}
