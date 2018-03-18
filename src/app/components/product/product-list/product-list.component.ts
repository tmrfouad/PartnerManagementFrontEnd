import { Product } from './../../../models/Product';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../base-component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

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
  productList: Product[];
  selectedIndex = 0;
  @Input('productItem') productItem;

  private _reload: string;
  get reload(): string {
    return this._reload;
  }

  @Input('reload') set reload(value: string) {
    this._reload = value;
    if (value === 'reload') {
      this.refreshProd();
      this._reload = '';
    }
  }

  @Output('submitProduct') submitProduct = new EventEmitter();
  constructor(private productService: ProductService,
    dialog: MatDialog,
    snackBar: MatSnackBar) {
    super(snackBar, dialog);
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
        this.productItem = this.productList[0];
        this.selectedIndex = 0;
        this.submitProduct.emit(this.productItem);
      }
    });
  }

  selectedRep(product, i) {
    this.selectedIndex = i;
    this.submitProduct.emit(product);
  }

  removeRep(id) {
    this.showConfirm('Are you sure you want to delete this Product?', 'Delete').subscribe(async reuslt => {
      if (reuslt === 'ok') {
        const del = await this.productService.delete(id);
        del.subscribe(() => {
          this.refreshProd();
        });
      }
    });
  }

  addProd() {
    this.selectedIndex = -1;
    // add product as property as the VS not accept the const
    const product = <Product>{};
    this.submitProduct.emit(product);
  }
}
